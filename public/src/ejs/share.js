+ function() {
    // if (!window['wx']) {
    //     return false;
    // }
    window.wxShare = new (function() {
        var obj = {
            title: '在路上',
            desc: '在路上、博客',
            link: 'http://wx.nodejs.so',
            imgUrl: "http://static.nodejs.so/sns.png"
        };
        this.setTitle = function(value){

        };
        this.setDesc = function(value){

        };
        this.setLink = function(value){

        };
        this.setSns = function(value){

        };
        this.ready = function(resp) {
            wx.config({
                debug: true,
                appId: resp.appid,
                timestamp: resp.timestamp,
                nonceStr: resp.nonceStr,
                signature: resp.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
            // 微信接口调用
            wx.ready(function() {
                var shareData = $.extend(obj,{
                    success: function() {

                    }
                });
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
            });
        };
        return this;
    })();
}();
