process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var token = require('./app/accessToken/controller.js');
var mongoose = require('./config/mongo.js');
var express = require('./config/express');

var db = mongoose();
var app = express();

var port = 80;

app.listen(port);
console.log('Crayfish on http://localhost:' + port);

// 7000 seconds get access token once;
token.fetchTokenInterval(7000, console.log);
