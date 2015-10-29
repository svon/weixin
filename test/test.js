
var http = require("http");
var post = function(index) {
    var opt = {
        method: "post",
        host: "127.0.0.1",
        port: "8000",
        path: "/wechat/config"
    };
    console.log(opt);
    var req = http.request(opt, function(res) {
        res.setEncoding('utf8');
        var str = '',
            resp;
        res.on("data", function(chunk) {
            str += chunk;
        });
        res.on("end", function() {
            console.log('return ticket:  ' + str);
            try {
                resp = JSON.parse(str);
                console.log(resp);
            } catch (e) {
                console.log('解析远程JSON数据错误', str);
            }
        });
    });
    req.end();
};
post();
