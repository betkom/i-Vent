'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	comment: {
		type: String,
		default: '',
		required: 'Please fill Comment',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}, 
	program: {
		type: Schema.ObjectId,
		ref: 'Program'
	}
});

mongoose.model('Comment', CommentSchema);