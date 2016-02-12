var Movie = require('./model.js');

var cheerio = require('cheerio');
var http = require('http');
var Iconv = require('iconv').Iconv;
var request = require('request');

var url = "http://www.ygdy8.net/html/gndy/dyzz/index.html";

var mvs = new Array();

function getMovies(){
	request({ 
		uri: url,
		method: 'GET',
		encoding: 'binary'
	}, function (error, response, body) {
		body = new Buffer(body, 'binary');
		conv = new Iconv('GBK', 'utf8');
		body = conv.convert(body).toString();
		
		var $ = cheerio.load(body);
		
	});
}

getMovies();