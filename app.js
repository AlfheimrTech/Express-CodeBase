var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// importing the route files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var videochat   = require('./routes/videochat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middlewares
app.use(logger('dev')); // for generating the logs
app.use(express.json()); // parses incoming JSON payloads 
app.use(express.urlencoded({ extended: false }));  // parses incoming URLEncoded Payloads
app.use(cookieParser()); //parses cookie header
app.use(express.static(path.join(__dirname, 'public'))); //serving the static content

// routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/videochat', videochat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
