/*
 * @Author: svon
 * @Date:   2015-10-27
 */


// ToUserName	开发者微信号
// FromUserName	发送方帐号（一个OpenID）
// CreateTime	消息创建时间 （整型）
// MsgType	text
// Content	文本消息内容
// MsgId   消息id，64位整型
module.exports = function (message) {
	var text;
	switch(message.Content){
		case "hi":
			text = "hi、我能帮你什么？";
			break;
		case "nihao":
			text = "你好、我能帮你什么？";
			break;
		case "test":
			text = "你在测试什么";
			break;
		case "demo":
			text = "你在干嘛呢？";
			break;
		case "你好":
			text = "你好、我是 Svon";
			break;
		default:
			text = '我是否不知道你要干嘛，可以试试点击<a href="http://svon.org">http://svon.org</a>'
			break;
	}
	return text;
}