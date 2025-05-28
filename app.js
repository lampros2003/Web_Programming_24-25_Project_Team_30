var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const {sessionMiddleware} = require('./setup/setup-session.js')
app.use(sessionMiddleware)

app.use((req, res, next) => {
  if (req.session) {
    res.locals.userId = req.session.loggedUserId;
  } else {
    res.locals.userId = null;
  }
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);


app.use('/admin', adminRouter);


app.use('/', indexRouter);
app.use('/about', indexRouter);
app.use('/menu', indexRouter);
app.use('/reservations', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
