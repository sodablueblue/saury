var Token = require('./model.js');
var https = require('https');
var config = require('../../config/secret.json');

var grantType = 'client_credential';
var appid = config.appid;
var secret = config.secret;
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grantType + '&appid=' + appid + '&secret=' + secret;

var fetchToken = function(){
	https.get(url, function(res){
		
		res.setEncoding('utf8');
		res.on('data', function(chunck){
			var token = new Token();
			var time = new Date();
			token.time = time.getTime();
			token.token = chunck.access_token;
			token.expire = chunck.expires_in + token.time;
			console.log(chunck);
			token.save(function(err){
				console.log(err);
			});
		});

	});
};

exports.getToken = function(cb){
	Token.findOne().exec(function(err, doc){
		if(err) console.log(err);
		cb(doc);
	});
};

exports.fetchTokenInterval = function(seconds, cb){
	var sec = seconds * 1000;
	setInterval(fetchToken, sec);
}