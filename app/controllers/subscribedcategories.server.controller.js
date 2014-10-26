'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Subscribedcategory = mongoose.model('Subscribedcategory'),
    _ = require('lodash');

/**
 * Create a Subscribedcategory
 */
exports.create = function(req, res) {
	var subscribedcategory = new Subscribedcategory(req.body);
	subscribedcategory.users = [];
    subscribedcategory.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscribedcategory);
        }
    });
};

/**
 * Show the current Subscribedcategory
 */
exports.read = function(req, res) {
    res.jsonp(req.subscribedcategory);
};

/**
 * Update a Subscribedcategory
 */
exports.update = function(req, res) {
    var subscribedcategory = req.subscribedcategory;

    subscribedcategory = _.extend(subscribedcategory, req.body);

    subscribedcategory.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscribedcategory);
        }
    });
};

/**
 * Delete an Subscribedcategory
 */
exports.delete = function(req, res) {
    var subscribedcategory = req.subscribedcategory;

    subscribedcategory.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscribedcategory);
        }
    });
};

/**
 * List of Subscribedcategories
 */
exports.list = function(req, res) { Subscribedcategory.find().sort('-created').exec(function(err, subscribedcategories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(subscribedcategories);
		}
	});
};

/**
 * Subscribedcategory middleware
 */
exports.subscribedcategoryByID = function(req, res, next, id) {
    Subscribedcategory.findById(id).populate('user', 'displayName').exec(function(err, subscribedcategory) {
        if (err) return next(err);
        if (!subscribedcategory) return next(new Error('Failed to load Subscribedcategory ' + id));
        req.subscribedcategory = subscribedcategory;
        next();
    });
};

/**
 * Subscribedcategory authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.subscribedcategory.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
