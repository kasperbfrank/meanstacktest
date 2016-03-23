var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
