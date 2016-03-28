var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(error, collection) {
        res.send(collection);
    });
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pw = encrypt.hashPw(userData.salt, userData.password);

    User.create(userData, function(error, user) {
        if(error) {
            if(error.toString().indexOf('E11000') > -1) { // E11000 is the mongoDb error code for duplicate username..
                error = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:error.toString()});
        }
        req.logIn(user, function(error) {
            if (error) {
                return next(error);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function(req, res) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;
    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pw = encrypt.hashPw(req.user.salt, userUpdates.password);
    }
    req.user.save(function(error) {
        if (error) {
            res.status(400);
            return res.send({reason:error.toString()});
        }
        res.send(req.user);
    });
};
