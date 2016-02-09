var Token = require('./model.js');
var https = require('https');
var config = require('../../config/secret.json');

var grant_type = 'client_credential';
var appid = config.appid;
var secret = config.secret;
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + 'APPID&secret=' + secret;

exports.fetchToken = function(){
	https.get(url, function(res){
		
		res.on('data', function(chunck){
			var token = new Token();
			var time = new Date();
			token.time = time.getTime();
			token.token = chunck.access_token;
			token.expire = chunck.expires_in + token.time;
			token.save(function(err){
				console.log(err);
			});
		});

	});
};

exports.getToken = function(cb){
	Token.findOne({}， function(err, doc){
		if(err) console.log(err);
		cb(doc);
	});
};