/* 
 * @Author: svon
 * @Date:   2015-09-09
 */

// +function(){
// 	var express = require('express');
// 	var cookieSession  = require('cookie-session');
// 	var app = express();
// 	var sess = cookieSession({
// 	  name: 'http://wx.nodejs.so',
// 	  keys: ['wx.nodejs.so']
// 	});
// 	app.use(sess);
// 	//加载配置
// 	require('./config/environment.js')(app, express);
// 	//加载路由
// 	require('./routes/routes.js')(app, express);
// 	var http = require('http').Server(app);
// 	http.listen(8000, "0.0.0.0", function () {
// 		console.log("Server running at http://127.0.0.1:8000");
// 	});
// }();

var express = require('express');
var wechat = require('wechat');
var app = express();
var config = {
  token: 'wx_nodejs_so',
  appid: 'wx116353cb702a6584',
  encodingAESKey: 'JPrNa6xruZkOLtYeMQddcs8t5oWVRuhmUPcJGnxtoHc'
};
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log(message);
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  }else if (message.FromUserName === 'hi') {
    //你也可以这样回复text类型的信息
    res.reply('hello wolrd');
  }
  else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));
require('./routes/routes.js')(app, express);
var http = require('http').Server(app);
http.listen(8000, "0.0.0.0", function () {
	console.log("Server running at http://127.0.0.1:8000");
});
