(function (resp) {
    //Created by svon on 2015/11/2.
    window.wxShare = function (callback) {
        callback(resp);
    };
    var date = new Date();
    var hm = document.createElement("script");
    hm.src = "//static.nodejs.so/share.js?date=" + date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
    var s = document.getElementsByTagName("head")[0];
    s.appendChild(hm);
})(arguments[0]);