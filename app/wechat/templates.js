var xml2js = require('xml2js');

exports.text = function(to, from, time, content){
	var json = {
		xml:{
			ToUserName: to,
			FromUserName: from,
			CreateTime: time,
			MsgType: 'text',
			Content: content
		}	
	};
	
	var builder = new xml2js.Builder({headless: true, cdata: true});
	return builder.buildObject(json);
}
