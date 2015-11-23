/**
 * route index.js
 * author: willian12345@126.com
 * github: https://github.com/willian12345/wechat-JS-SDK-demo
 * time: 2015-1-27
 */


var querystring = require('querystring');
var fs = require('fs');
var path = require("path");
var StaticRoot = path.join(__dirname, "./");
var crypto = require("crypto");

function md5(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    return "md5_" + crypto.createHash("md5").update(str).digest("hex");
}

module.exports = function(app,api) {
    var cachedSignatures = {};
    // 输出数字签名对象
    var responseWithJson = function(res, data) {
        // 允许跨域异步获取
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "text/javascript; charset=utf-8"
        });
        var share = function(file) {
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
        } else {
            fs.readFile(path.join(StaticRoot, "./share.js"), "utf-8", function(err, file) {
                if (err) {
                    console.log(err);
                } else {
                    fileshare = file;
                    res.send(share(file));
                }
            });
        }
    };

    // 2小时后过期，需要重新获取数据后计算签名
    var expireTime = 7200 - 100;
    // 时间戳产生函数
    var createTimeStamp = function() {
        return parseInt(new Date().getTime() / 1000) + '';
    };
    // 通过请求中带的index值来判断是公司运营的哪个公众平台
    function config(req, res) {
        console.log("---------------------------------------------------------");
        var getdata = function() {
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

        var url = body['url'] || headers['referer'];
        if(!url){
            url  = "http://" + req.headers.host + req.originalUrl;
        }
        console.log("url : ", url);
        var signatureObj = cachedSignatures[md5(url)] || null;
        console.log("cache : ", signatureObj);
        // 如果缓存中已存在签名，则直接返回签名
        if (signatureObj && signatureObj.ts) {
            var t = createTimeStamp() - signatureObj.ts;
            // 未过期，并且访问的是同一个地址
            // 判断地址是因为微信分享出去后会额外添加一些参数，地址就变了不符合签名规则，需重新生成签名
            if (t < expireTime && signatureObj.url == url) {
                return responseWithJson(res, signatureObj);
            } else {
                delete cachedSignatures[url];
            }
        }
        api.getJsConfig({
            debug: false,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ],
            url: url
        }, function(err, result) {
            result.ts =  createTimeStamp();
            cachedSignatures[md5(url)] = result;
            responseWithJson(res, result);
        });
    };
    app.route('/config/wechat.js').get(config);
    console.log("config ready");
};
