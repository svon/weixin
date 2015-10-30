$(function() {
    $.get(
        "/config", {
            url: location.href.split('#')[0]
        },
        function(resp) {
            wx.config({
                debug: false,
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
                var shareData = {
                    title: '在路上',
                    desc: '在路上、博客',
                    link: 'http://wx.nodejs.so',
                    imgUrl: "http://static.nodejs.so/sns.png",
                    success: function() {

                    }
                };
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
            });
        }
    );
});
