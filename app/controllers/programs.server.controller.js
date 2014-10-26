'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Program = mongoose.model('Program'),
    Comment = mongoose.model('Comment'),
    Like = mongoose.model('Like'),
    Subscribedcategory = mongoose.model('Subscribedcategory'),
    schedule = require('node-schedule'),
    http = require('http'),
    _ = require('lodash');

/**
 * Create a Program
 */
exports.create = function(req, res) {

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
			Subscribedcategory.find({categoryName: program.category}).exec(function(res){
                if(res === null && !res){
                    return;
                }
                for (user in res.users){
                    var msg = "There%20is%20a " + program.category + "event%20scheduled%20for%20" + program.programDate;
                    sendSMS(user.phoneNumber, msg);
                }
            })
		}
	});

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

};

var makePhoneCall = function(phoneNumber, vxml) {
    var options = {
        hostname: 'rest.nexmo.com',
        port: 80,
        path: vxml,
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
    var splitDate = req.program.programDate.split('-');
    var splitTime = req.program.programTime.split(':');
    var date = new Date(parseInt(splitDate[0], 10), parseInt(splitDate[1], 10)-1, parseInt(splitDate[2], 10)-1, 
        parseInt(splitTime[0], 10), parseInt(splitTime[1], 10), 0);
    var r = req.location.split(" ");
    var vxml = "/tts/json?api_key=5691ad12&api_secret=a8abd3c5&to="+ req.user.phoneNumber +"&text="+"You%20Have%20an%20event%20in%20an%20hours%20time%20at%20"+r[0]+"&lg=en-gb&repeat=5"
    var job = schedule.scheduleJob(date, function(){
        makePhoneCall(req.user.phoneNumber, vxml);
    });
    console.log("done");
    res.jsonp({});
}




/**
 * List of Programs
 */
exports.list = function(req, res) {

        Program.find().sort('-likes').populate('user', 'displayName').exec(function(err, programs) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(programs);
            }
        });
    };
    exports.search = function(req, res) {
        var $or = {
            $or: []
        };
        var checkQuery = function() {
            if (req.query.location && req.query.location.length > 0) {
                $or.$or.push({
                    location: new RegExp(req.query.location, 'i')
                });
            }
            if (req.query.category && req.query.category.length > 1) {
                $or.$or.push({
                    category: new RegExp(req.query.category, 'i')
                });
            }
            if (req.query.programDate && req.query.programDate.length > 1) {
                $or.$or.push({
                    programDate: new RegExp(req.query.programDate)
                });
            }
        };
        checkQuery();
        Program.find($or).exec(function(err, programs) {
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
