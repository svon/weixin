/* 
 * @Author: svon
 * @Date:   2015-09-09
 */
var path = require("path");
var fs = require("fs");
var home = require('../controller/home.js');
module.exports = function (app, exress) {
 	app.route('/')
 		.get(function(req,res) {
		 	home(req,res);
		})
		.post(function(req,res) {
		 	home(req,res);
		}
	);
	
	app.all('*', function (req, res) {
		home(req,res);
	});
};