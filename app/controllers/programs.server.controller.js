'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Program = mongoose.model('Program'),
    _ = require('lodash');

/**
 * Create a Program
 */
exports.create = function(req, res) {
    var program = new Program(req.body);
    program.user = req.user;

    program.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Show the current Program
 */
exports.read = function(req, res) {
    res.jsonp(req.program);
};

/**
 * Update a Program
 */
exports.update = function(req, res) {
    var program = req.program;

    program = _.extend(program, req.body);

    program.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Delete an Program
 */
exports.delete = function(req, res) {
    var program = req.program;

    program.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(program);
        }
    });
};


var http = require('http');

var testNexmo = function() {
    var options = {
        hostname: 'rest.nexmo.com',
        port: 80,
        path: '/call/json?api_key=5691ad12&api_secret=a8abd3c5&to=2348108006885&answer_url=https://africancampaigns.com/rest_api/call.vxml',
        method: 'POST'
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
};

var testNexmoText = function() {
    var options = {
        hostname: 'rest.nexmo.com',
        port: 80,
        path: '/sms/json?api_key=5691ad12&api_secret=a8abd3c5&&from=iVent&to=2348108006885&text=D%C3%A9j%C3%A0%2Bvu',
        method: 'POST'
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
};

/**
 * List of Programs
 */
exports.list = function(req, res) {
    testNexmoText();
    Program.find().sort('-created').populate('user', 'displayName').exec(function(err, programs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(programs);
        }
    });
};

/**
 * Program middleware
 */
exports.programByID = function(req, res, next, id) {
    Program.findById(id).populate('user', 'displayName').exec(function(err, program) {
        if (err) return next(err);
        if (!program) return next(new Error('Failed to load Program ' + id));
        req.program = program;
        next();
    });
};

/**
 * Program authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.program.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
