var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    app.set('views', path.join(config.rootPath, 'server/views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(config.rootPath, 'public')));

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({secret: 'mean stack unicorns', resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());
}
