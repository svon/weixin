/* 
 * @Author: svon
 * @Date:   2015-09-012
 */

var path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	mate = require('ejs-mate'),
	compression = require('compression');

exports = module.exports = function (app, express) {
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(function(req, res, next){
		req.getdata = function(){
			var data = req.query || {},
				body = req.body || {},
				params = req.params || {};
			for(var key in body){
				data[key] = body[key];
			}
			for(var key in params){
				data[key] = params[key];
			}
			return data;
		};
		res.setHeader('Server','Node.js');
		res.setHeader('X-Powered-By','Svon servers  http://wx.nodejs.so');
		next();
	});
	app.use(compression());
	app.use(express.static(path.resolve(__dirname, './../public/src')));
	app.set('views', 'public/src/ejs');
	app.engine('.html', mate);
	app.set('view engine', 'html');
};