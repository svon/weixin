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
var webot = require('weixin-robot');

var app = express();

// 指定回复消息
webot.set('hi', '你好');

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅微信机器人';
  }
});

webot.set('test', {
  pattern: /^test/i,
  handler: function(info, next) {
    next(null, 'roger that!')
  }
});


// 接管消息请求
webot.watch(app, { token: 'wx_nodejs_so', path: '/wechat' });


// 启动 Web 服务
// 微信后台只允许 80 端口
app.listen(8000,function(){
	console.log("http://127.0.0.1:8000");
});


