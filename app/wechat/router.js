var wechat = require('./controller');

module.exports = function(app){
	app.route('/badmango').get(wechat.authen).post(wechat.subscribe, wechat.parseXml);
};
