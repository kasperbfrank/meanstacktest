var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(env === 'development') {
    mongoose.connect('mongodb://localhost/meantestdb'); // use local db if in development
} else {
    mongoose.connect('mongodb://kasperbfrank:meantest@ds013619.mlab.com:13619/meantest'); // use external db if in production (this example is built using a mongolab db)
}

var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error.message);
})
db.once('open', function(callback) {
    console.log('meantest db opened.');
});

var messageSchema = mongoose.Schema({message: String});
var message = mongoose.model('Message', messageSchema);
var mongoMessage;
message.findOne().exec(function(error, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
