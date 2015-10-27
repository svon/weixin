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



require('./routes/routes.js')(app, express);
var http = require('http').Server(app);
http.listen(8000, "0.0.0.0", function () {
	console.log("Server running at http://127.0.0.1:8000");
});