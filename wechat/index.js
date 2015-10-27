/*
 * @Author: svon
 * @Date:   2015-10-27
 */
var path = require("path");
var fs = require("fs");

var wechat = require('wechat');
var config = {
  token: 'wx_nodejs_so',
  appid: 'wx116353cb702a6584',
  encodingAESKey: 'JPrNa6xruZkOLtYeMQddcs8t5oWVRuhmUPcJGnxtoHc'
};

var Msg = function(message){
// ToUserName	开发者微信号
// FromUserName	发送方帐号（一个OpenID）
// CreateTime	消息创建时间 （整型）
// MsgType	text
// Content	文本消息内容
// MsgId   消息id，64位整型

	var res = null;
	console.log(message);
	switch(message.MsgType){
		//文本消息
		case "text":
			res = require("./msg_txt.js")(message);
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
			res = [
		      {
		        title: '你好',
		        description: '这是我的个人博客网址',
		        picurl: 'https://avatars3.githubusercontent.com/u/11793712?v=3&s=200',
		        url: 'http://svon.org/'
		      }
		    ];
			break;
	}
	return res;
}



module.exports = function (app, exress) {
 	app.use('/wechat', wechat(config, function (req, res, next) {
	  // 微信输入信息都在req.weixin上
	  var data = Msg(req.weixin);
	  // if (message.FromUserName === 'diaosi') {
	  //   // 回复屌丝(普通回复)
	  //   res.reply('hehe');
	  // }else if (message.FromUserName === 'hi') {
	  //   //你也可以这样回复text类型的信息
	  //   res.reply('hello wolrd');
	  // }
	  // else if (message.FromUserName === 'text') {
	  //   //你也可以这样回复text类型的信息
	  //   res.reply({
	  //     content: 'text object',
	  //     type: 'text'
	  //   });
	  // } else if (message.FromUserName === 'hehe') {
	  //   // 回复一段音乐
	  //   res.reply({
	  //     type: "music",
	  //     content: {
	  //       title: "来段音乐吧",
	  //       description: "一无所有",
	  //       musicUrl: "http://mp3.com/xx.mp3",
	  //       hqMusicUrl: "http://mp3.com/xx.mp3",
	  //       thumbMediaId: "thisThumbMediaId"
	  //     }
	  //   });
	  // } else {
	  //   // 回复高富帅(图文回复)
	  //   res.reply([
	  //     {
	  //       title: '你来我家接我吧',
	  //       description: '这是女神与高富帅之间的对话',
	  //       picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
	  //       url: 'http://nodeapi.cloudfoundry.com/'
	  //     }
	  //   ]);
	  // }
	  console.log("server : ",data);
	  res.reply(data);
	}));
	console.log("wechat ready");
};