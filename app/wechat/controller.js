var crypto = require('crypto');
var xml2js = require('xml2js');

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

exports.parseXml = function(req, res, next){
	req.xml = '';
	req.setEncoding('utf8');
	req.on('data', function(chunck){
		req.xml += chunck;
	});
	req.on('end', function(){
		var parser = new xml2js.Parser();
		parser.parseString(req.xml, function(err, result){
			if(err){
				console.log(err);
				process.exit(1);
			}
			req.xml = result.xml;
			next();
		});
	});
};

exports.dealer = function(req, res){
	if(req.xml.MsgType == 'event'){
		if(req.xml.Event == 'subscribe'){
			res.end(handlers.subscribe(req.xml));
		}else if(req.xml.Event == 'unsubscribe'){
			res.end(handlers.unsubscribe(req.xml));
		}else{
			res.end(handlers.error(req.xml, 'Unsupported Event'));
		}
	}else if(req.xml.MsgType == 'text'){
		res.end(handlers.text(req.xml));
	}else{
		res.end(handlers.error(req.xml, 'Unsupported message type'));
	}
};

