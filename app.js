//dependencies
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors')
const passport = require("passport");
//middlewares

require('./helpers/passport')

//routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chekinsRouter = require('./routes/chekins');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: process.env.SECRET,
   resave: true,
   saveUninitialized: true
  }));
//passport
app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    origin: '*'
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chekins', chekinsRouter);

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
