var routes = require('./routes'), user = require('./routes/user'), page = require('./routes/page');

module.exports = function(app) {
	app.post('/messages/like/sayHi', page.test);
	app.post('/user/updateUser', page.test);
	
	app.post('/recommend/list', page.mock);
	app.get('/recommend/list', page.mock);
	
	app.post('/newCount', page.mock);
	app.get('/newCount', page.mock);
}; 