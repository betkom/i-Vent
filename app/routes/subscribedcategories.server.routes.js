'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var subscribedcategories = require('../../app/controllers/subscribedcategories');

	// Subscribedcategories Routes
	app.route('/subscribedcategories')
		.get(subscribedcategories.list)
		.post(users.requiresLogin, subscribedcategories.create);

	app.route('/subscribedcategories/:subscribedcategoryId')
		.get(subscribedcategories.read)
		.put(users.requiresLogin, subscribedcategories.hasAuthorization, subscribedcategories.update)
		.delete(users.requiresLogin, subscribedcategories.hasAuthorization, subscribedcategories.delete);

	// Finish by binding the Subscribedcategory middleware
	app.param('subscribedcategoryId', subscribedcategories.subscribedcategoryByID);
};