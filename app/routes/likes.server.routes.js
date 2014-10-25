'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var likes = require('../../app/controllers/likes');
	var programs = require('../../app/controllers/programs');

	// Likes Routes
	app.route('programs/:programId/likes')
		.get(likes.list)
		.post(users.requiresLogin, likes.create);

	app.route('programs/:programId/likes/:likeId')
		.get(likes.read)
		.delete(users.requiresLogin, likes.hasAuthorization, likes.delete);

	// Finish by binding the Like middleware
	app.param('likeId', likes.likeByID);
};