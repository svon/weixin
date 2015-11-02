/**
 * Created by svon on 2015/11/2.
 */
(function (resp) {
    window.wxShare = function (callback) {
        callback(resp);
    };
    var Format = function (fmt) {
        var date = new Date();
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    var hm = document.createElement("script");
    hm.src = "//static.nodejs.so/share.js?date=" + Format("yyyy-MM-dd");
    var s = document.getElementsByTagName("head")[0];
    s.appendChild(hm);
})(arguments[0]);