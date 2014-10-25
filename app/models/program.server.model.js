'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Program Schema
 */
var ProgramSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Program name',
		trim: true
	},
	ProgramDate: {
		type: String,
		default: '',
		required: 'Please fill date in this format yyy/mm/dd',
		trim: true
	},

	ProgramTimeMinute: {
	type: String,
	default: '',
	required: 'Please fill minutes mm',
	},

	ProgramTimeHour: {
	type: String,
	default: '',
	required: 'Please fill minutes mm',
	trim: true
	},

	category: {
		type: String,
		default: '',
		required: 'Please choose a category',
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill a description',
	},

	location: {
		type: String,
		default: '',
		required: 'Please fill the location',
		trim: true
	},

	image: [{
		path:{type: String,
		default: ''
		}
	}],

	likes: [{
		type: Schema.ObjectId,
		ref: 'Like'
	}],

	comments: [{
		type: Schema.ObjectId,
		ref: 'Comment'
	}],

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Program', ProgramSchema);