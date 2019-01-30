// set up ======================================================================
// get all the tools we need
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); //Morgan is used for logging request details
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var config = require('./config/database');
var auth = require('./routes/auth');

// configuration ===============================================================
require('./config/passport')(passport); // pass passport for configuration

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true })
    .then(() =>  console.log('connection to database successful'))
    .catch((err) => console.error(err));

// set up our express application
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// required for passport
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// routes ======================================================================

app.use('/api', auth);

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
