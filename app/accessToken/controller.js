var Token = require('./model.js');
var https = require('https');
var config = require('../../config/secret.json');

var grantType = 'client_credential';
var appid = config.appid;
var secret = config.secret;
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grantType + '&appid=' + appid + '&secret=' + secret;

var fetchToken = function(){
	https.get(url, function(res){
		var body = '';

		res.setEncoding('utf8');
		res.on('data', function(chunck){
			body += chunck;
		});

		res.on('end', function(){
			var token = new Token();
			var time = new Date();
			token.time = time.getTime();
			body = JSON.parse(body);
			token.token = body.access_token;
			token.expire = Number(body.expires_in) + Number(token.time);
			
			token.save(function(err){
				if(err) console.log(err);
			});
		});

	});
};

exports.getToken = function(cb){
	Token.findOne().sort('-time').exec(cb);
};

exports.fetchTokenInterval = function(seconds, cb){
	var sec = seconds * 1000;
	setInterval(fetchToken, sec);
}
