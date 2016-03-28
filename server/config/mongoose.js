var mongoose = require('mongoose'),
    userModel = require('../models/User');
    courseModel = require('../models/Course');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', function(error) {
        console.log(error.message);
    })
    db.once('open', function(callback) {
        console.log('meantest db opened.');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
}
