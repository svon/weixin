/*
 * @Author: svon
 * @Date:   2015-10-27
 */
var path = require("path");
var fs = require("fs");

var wechat = require('wechat');
var config = require('./info.js')()[0]; // 从外部加载app的配置信息
var Msg = function(message) {
    // ToUserName	开发者微信号
    // FromUserName	发送方帐号（一个OpenID）
    // CreateTime	消息创建时间 （整型）
    // MsgType	text
    // Content	文本消息内容
    // MsgId   消息id，64位整型

    var res = null;
    switch (message.MsgType) {
        //文本消息
        case "text":
            res = require("./msg_txt.js")(message);
            break;
        case "event":
            var eventType = message.Event;
            if (eventType) {
                eventType = eventType.toLowerCase();
            }
            if (eventType == 'subscribe') {
                // 新用户关注/订阅事件  
                res = {
                    type: "text",
                    content: "欢迎关注"
                };
            } else if (eventType == 'click') {
                res = {
                    type: "text",
                    content: "你好 你是否选择了什么，但是我不知道。"
                };
            } else {
                res = {
                    type: "text",
                    content: "你好、我能帮你什么？"
                };
            }
            break;
            //图片消息
        case "image":
            //break;
            //语音
        case "voice":
            //break;
            //视频消息
        case "video":
            //break;
            //小视频消息
        case "shortvideo":
            //break;
            //地理位置消息
        case "location":
            //break;
            //链接消息
        case "link":
            //break;
        default:
            res = [{
                title: '你好',
                description: '这是我的个人博客网址',
                picurl: 'https://avatars3.githubusercontent.com/u/11793712?v=3&s=200',
                url: 'http://svon.org/'
            }];
            break;
    }
    return res;
};

var WechatAPI  = require('wechat-api');
module.exports = function(app, exress) {
    //var api = new WechatAPI(config.appid, config.secret);
    //var menu = require('./wechat-menu.js')();
    //api.createMenu(menu, function(err,result){
    //	console.log(err,result);
    //});
    app.use('/wechat', wechat(config, function(req, res, next) {
        // 微信输入信息都在req.weixin上
        var data = Msg(req.weixin);
        console.log("server : ", data);
        res.reply(data);
    }));
    console.log("wechat ready");
    require("./config.js")(app);
};
