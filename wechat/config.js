/**
 * route index.js
 * author: willian12345@126.com
 * github: https://github.com/willian12345/wechat-JS-SDK-demo
 * time: 2015-1-27
 */

var http = require("http");
var https = require("https");
var jsSHA = require('jssha');
var querystring = require('querystring');
var fs = require('fs');
var path = require("path");
var StaticRoot = path.join(__dirname, "./");
module.exports = function (app) {
    // 输出数字签名对象
    var responseWithJson = function (res, data) {
        // 允许跨域异步获取
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "text/javascript; charset=utf-8"
        });
        var share = function (file) {
            var array = [
                '(function(){',
                file,
                '})(' + JSON.stringify(data) + ')'
            ];
            return array.join("");
        };
        var fileshare;
        if (fileshare) {
            res.send(share(fileshare));
        }
        else {
            fs.readFile(path.join(StaticRoot, "./share.js"), "utf-8", function (err, file) {
                if (err) {
                    console.log(err);
                } else {
                    fileshare = file;
                    res.send(share(file));
                }
            });
        }
    };

    // 随机字符串产生函数
    var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };

    // 时间戳产生函数
    var createTimeStamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };

    // 2小时后过期，需要重新获取数据后计算签名
    var expireTime = 7200 - 100;

    var getAppsInfo = require('./info.js'); // 从外部加载app的配置信息
    var appIds = getAppsInfo();
    /**
     缓存在服务器的每个URL对应的数字签名对象
     {
         'http://game.4gshu.com/': {
             appid: 'wxa0f06601f194xxxx'
             ,secret: '097fd14bac218d0fb016d02f525dxxxx'
             ,timestamp: '1421135250'
             ,noncestr: 'ihj9ezfxf26jq0k'
         }
     }
     */

    // 计算签名
    var calcSignature = function (ticket, noncestr, ts, url) {
        var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + ts + '&url=' + url;
        shaObj = new jsSHA(str, 'TEXT');
        return shaObj.getHash('SHA-1', 'HEX');
    }

    // 获取微信签名所需的ticket
    var getTicket = function (url, index, res, accessData) {
        https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessData.access_token + '&type=jsapi', function (_res) {
            var str = '',
                resp;
            _res.on('data', function (data) {
                str += data;
            });
            _res.on('end', function () {
                resp = JSON.parse(str);
                var appid = appIds[index].appid;
                var ts = createTimeStamp();
                var nonceStr = createNonceStr();
                var ticket = resp.ticket;
                var signature = calcSignature(ticket, nonceStr, ts, url);
                responseWithJson(res, {
                    nonceStr: nonceStr,
                    timestamp: ts,
                    appid: appid,
                    signature: signature
                });
            });
        });
    };

    // 通过请求中带的index值来判断是公司运营的哪个公众平台
    function config(req, res) {
        console.log("---------------------------------------------------------");
        var getdata = function () {
            var data = req.query || {},
                body = req.body || {},
                params = req.params || {};
            for (var key in body) {
                data[key] = body[key];
            }
            for (var key in params) {
                data[key] = params[key];
            }
            return data;
        };
        var body = getdata();
        var headers = req.headers;
        body['url'] ? true : (body['url'] = headers['referer']);
        console.log(body);
        var index = 0;
        // 获取微信签名所需的access_token
        https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appIds[index].appid + '&secret=' + appIds[index].secret, function (_res) {
            var str = '',
                resp;
            _res.on('data', function (data) {
                str += data;
            });
            _res.on('end', function () {
                resp = JSON.parse(str);
                getTicket(body['url'], index, res, resp);
            });
        });
    };
    app.route('/config/wechat.js').get(config);
    console.log("config ready");
};
