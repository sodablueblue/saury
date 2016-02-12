var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: String,
	date: String,
	director: String,
	actors: String,
	link: String,
	poster: String
});

var Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;