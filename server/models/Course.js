var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required!'},
    featured: {type:Boolean, required:'{PATH} is required!'},
    new: {type:Boolean, required:'{PATH} is required!'}
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function(error, collection) {
        if (collection.length === 0) {
            Course.create({title: 'C# for dummies', featured: true, new: false});
            Course.create({title: 'Java for dummies', featured: true, new: false});
            Course.create({title: 'Obj-C for smart people', featured: true, new: false});
            Course.create({title: 'Java for wizards', featured: true, new: true});
            Course.create({title: 'C# for smart people', featured: false, new: true});
            Course.create({title: 'Obj-C for dummies', featured: true, new: false});
            Course.create({title: 'Javascript for dummies', featured: true, new: false});
            Course.create({title: 'Javascript for wizards', featured: false, new: true});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;
