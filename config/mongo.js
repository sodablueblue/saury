var mongoose = require('mongoose');

var connect = {
	db: 'mongodb://localhost/saury'
};

module.exports = function(){
	var db = mongoose.connect(connect.db);
	return db;	
}