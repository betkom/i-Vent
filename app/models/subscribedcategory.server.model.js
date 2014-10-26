'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Subscribedcategory Schema
 */
var SubscribedcategorySchema = new Schema({
	categoryName: {
		type: String,
		default: '',
		required: 'Please fill Subscribedcategory name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	users: [{
		type: Schema.ObjectId,
		ref: 'User'
	}]
});

mongoose.model('Subscribedcategory', SubscribedcategorySchema);