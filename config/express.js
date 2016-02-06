var express = require('express');
var http = require('http');

module.exports = function(){
	/*Init app and http server*/
	var app = express();
	var server = http.createServer(app);

	/*Set Env*/
	// if(process.env.NODE_ENV === 'development'){

	// }else{

	// }

	/*Set static folder*/
	app.set('views', './app/views');
	app.engine('.html', require('ejs').renderFile);
	app.use(express.static('./public'));
    
	/*Set Routers*/
	require('../app/wechat/router')(app);

	return server;
}
