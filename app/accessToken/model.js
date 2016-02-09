var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
	time: String,
	token: String,
	expire: String
});

var Token = mongoose.model('token', tokenSchema);
