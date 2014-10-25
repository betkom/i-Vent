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
		required: 'Please fill Event Title',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Please fill Event category',
		trim: true
	},
	location: {
		type: String,
		default:'',
		required: 'Please fill Event location',
		trim: true
	},
	programDate: {
		type: String,
		required: 'Please fill in Event date',
		trim: true
	},
	programTime: {
		type: String,
		required: 'Please fill in Event time in the format 00:00 24hrs',
		trim : true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill in Event details',
		trim: true
	},
	image: [{
        path: {
            type: String,
            default: ''
        }
    }],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	 likes: [{
        type: Schema.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }]
});

mongoose.model('Program', ProgramSchema);