'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),

    errorHandler = require('./errors'),
    Program = mongoose.model('Program'),
    Comment = mongoose.model('Comment'),
    Like = mongoose.model('Like'),
<<<<<<< HEAD
=======
    schedule = require('node-schedule'),
>>>>>>> a7ed10675448732fadd741f7d1330d00b685f3c0
    _ = require('lodash');

/**
 * Create a Program
 */
exports.create = function(req, res) {

<<<<<<< HEAD
    // Sets default image
    req.body.image = req.body.image && req.body.image[0] && req.body.image[0].length > 0 ? req.body.image : [{
        path: '/modules/core/img/loaders/defaultimage.png'
    }];
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
=======
    //Sets default image
    req.body.image = req.body.image && req.body.image[0] && req.body.image[0].length > 0 ? req.body.image : [{
        path: '/modules/core/img/loaders/defaultimage.png'
    }];
	var program = new Program(req.body);
	program.user = req.user;

	program.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(program);
			// SubscribedCategory.find({categoryName: program.category}).exec(function(res){
   //              for (user in res.users){
   //                  sendSMS(user.phoneNumber, "blah blah");
   //              }
   //          })
		}
	});
>>>>>>> a7ed10675448732fadd741f7d1330d00b685f3c0
};

/**
 * Show the current Program
 */
exports.read = function(req, res) {

    if (req.user) {
        Like.find({
            user: req.user,
            program: req.program
        }).populate('user', '_id').exec(function(err, like) {
            if (!err) {
                var response = {
                    program: req.program,
                    userlike: like.length > 0 ? like : false
                };
                res.jsonp(response);
            }
        });
    } else
        res.jsonp({
            program: req.program,
            userlike: null
        });
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
<<<<<<< HEAD
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


var schedule = require('node-schedule');
var testSchedule = function() {
    var date = new Date(2014, 9, 25, 19, 40, 0);
    console.log('in side test schedule');
    var j = schedule.scheduleJob(date, function() {
        console.log('The world is going to end today.', date);
    });
=======
>>>>>>> a7ed10675448732fadd741f7d1330d00b685f3c0
};


var http = require('http');

var makePhoneCall = function(phoneNumber, vxml) {
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

var sendSMS = function(phoneNumber, msg) {
    var options = {
        hostname: 'rest.nexmo.com',
        port: 80,
        path: '/sms/json?api_key=5691ad12&api_secret=a8abd3c5&&from=iVent&to=' + phoneNumber+ '&text=' + msg,
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



exports.createSchedule = function(req, res){
    var date = new Date(2014, 9, 25, req.program.programTimeHour - 1, req.program.programTimeMinute, 0);

    var job = schedule.scheduleJob(date, function(){
        makePhoneCall(req.user.phoneNumber, vxml);
    });
}



/**
 * List of Programs
 */

exports.list = function(req, res) {
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
