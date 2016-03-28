var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pw: {type:String, required:'{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPw(this.salt, passwordToMatch) === this.hashed_pw;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPw(salt, 'kasper1234');
            User.create({
                firstName: 'Kasper',
                lastName: 'Frank',
                username: 'kasperbfrank',
                salt: salt,
                hashed_pw: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPw(salt, 'soeren1234');
            User.create({
                firstName: 'Søren',
                lastName: 'Frank',
                username: 'soerenbf',
                salt: salt,
                hashed_pw: hash
            });
        }
    });
};

exports.createDefaultUsers = createDefaultUsers; // this is just getUsers called createDefaultUsers because it creates users if none are present..
