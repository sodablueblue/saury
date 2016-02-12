var templates = require('./templates.js');

exports.text = function(xml){
	var from = xml.ToUserName;
	var to = xml.FromUserName;
	var date = new Date();
	var time = date.getTime();
	var content = 'What do u wanna do...';

	return templates.text(to, from, time, content);
};

exports.subscribe = function(xml){
	var from = xml.ToUserName;
	var to = xml.FromUserName;
	var date = new Date();
	var time = date.getTime();
	var content = '欢迎关注 Bad Mango!\n'+
	'这里没有溜须拍马的五毛，也没有义愤填膺' + 
	'的愤青，只有一个烂芒果的胡言乱语，' + 
	'嬉笑怒骂全凭意气用事。\n本公众号不定期推送' + 
	'Lz喜欢的电影、音乐、小文章等，欢迎各种意见建议，' +
	'不一定采纳~';

	return templates.text(to, from, time, content);
};

exports.unsubscribe = function(xml){

};

exports.error = function(xml, message){
	console.log(message);
};
