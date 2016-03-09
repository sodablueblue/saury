var request = require('request');
var accessToken = require('../accessToken/controller.js');
var q = require('q');
var fs = require('fs');

var url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=';

function getToken(){
	return q.promise(function(resolve, reject){
		accessToken.getToken(function(err, body){
			if(err) reject('Get Token Error ' . err);
			resolve(body);
		});
	});
}

function composeUrl(token){
	return q.promise(function(resolve, reject){
		resolve(url + token.token);
	});
}

function post(url){
	return q.promise(function(resolve, reject){
		request.post({url: url, form: {media: /*fs.createReadStream(media)*/'test'}}, function(err, res, body){
			if(err) reject(err);
			resolve(body);
		});
	});
}

module.exports = function(media, cb){
	getToken()
	.then(function(token){
		return composeUrl(token);
	})
	.then(post)
	.then(cb)
	.catch(console.log)
	.done();
};