'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Subscribedcategory = mongoose.model('Subscribedcategory');

/**
 * Globals
 */
var user, subscribedcategory;

/**
 * Unit tests
 */
describe('Subscribedcategory Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			subscribedcategory = new Subscribedcategory({
				name: 'Subscribedcategory Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return subscribedcategory.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			subscribedcategory.name = '';

			return subscribedcategory.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Subscribedcategory.remove().exec();
		User.remove().exec();

		done();
	});
});