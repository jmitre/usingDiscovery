var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http")

var routes = require('./routes/index');
var users = require('./routes/users');
var studentsRoutes = require('./routes/students');
var helloworldRoute = require('./routes/helloworld');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/students', studentsRoutes);
app.use('/helloworld', helloworldRoute)

var request = require('request');

var service =   JSON.stringify({
      "name": "hello",
      "tags": [
        "http://localhost:3000/helloworld"
      ],
      "address": "127.0.0.1",
      "enableTagOverride": false
  })

  var options = {
    host: 'localhost',
    path: '/v1/agent/service/register',
    port: '8500',
    method: 'PUT',
    headers: headers
  }

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': service.length
};

function register() {
    console.log("IM REGISTERING");
    http.request(options, function (res) {
      console.log("REGISTERED --->", res.body);
    }).write(service);
}
register();






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
