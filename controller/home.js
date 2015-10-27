/* 
 * @Author: svon
 * @Date:   2015-09-09
 */
var crypto = require("crypto");
function sha1(str) {
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

module.exports = function(req, res) {
    var query = req.getdata()
    //console.log("*** URL:" + req.url);
    var signature = query.signature||null;
    var echostr = query.echostr||null;
    var timestamp = query['timestamp']||null;
    var nonce = query.nonce||null;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "wx_nodejs_so"; //这里是你在微信开发者中心页面里填的token
    oriArray.sort();
    var original = oriArray.join('');
    var scyptoString = sha1(original);
    var data = {
    	"line1":"-----------------------------------",
    	"url":req.url,
    	"nonce":nonce,
    	"timestamp":timestamp,
    	"echostr":echostr,
    	"Original":original,
    	"Signature":signature,
    	"scyptoString":scyptoString,
    	"line2":"-----------------------------------"
    };
    for(var key in query){
    	key && (data[key] = query[key]);
    }
    res.send(data);
};
