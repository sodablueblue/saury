var crypto = require('crypto');
var xml2js = require('xml2js');
var templates = require('./templates');
var q = require('q');

exports.authen = function(req, res){
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;
	var token = 'badmango';

	var tmpArr = [token, timestamp, nonce];
	tmpArr.sort();
	var tmpStr = tmpArr.join('');
	tmpStr = crypto.createHash('sha1').update(tmpStr).digest('hex');
	
	if(tmpStr == signature){
		res.end(echostr);
	}else{
		console.log('Authentication fail!');
	}
};

exports.subscribe = function(req, res, next){
	req.xml = '';
	req.setEncoding('utf8');
	req.on('data', function(chunck){
		req.xml += chunck;
	});
	req.on('end', function(){
		next();
	});
	
};

exports.parseXml = function(req, res, next){
	var parser = new xml2js.Parser();
	parser.parseString(req.xml, function(err, result){
		if(err){
			console.log(err);
			process.exit(1);
		}
		req = result;
		var type = req.xml.MsgType;
		var toUser = req.xml.FromUserName;
		var fromUser = req.xml.ToUserName;
		var date = new Date();
		var time = date.getTime();
		if(type == 'event'){
			var content = '欢迎关注Badmango!';
		}else{
			var content = '你想干嘛。。。';
		}
		var reply = templates.text(toUser, fromUser, time, content);	
			
		res.end(reply);
	});
};	
