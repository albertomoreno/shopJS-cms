
'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    mongoose = require('mongoose'),
    router = require('./router');
var bodyParser = require('body-parser');

var app = express();

// Middlewares
app.use('/tmp/styles', express.static(path.join(__dirname, 'tmp', 'styles')));
app.use('/tmp/fonts', express.static(path.join(__dirname, 'tmp', 'fonts')));
app.use('/tmp/vendor', express.static(path.join(__dirname, 'tmp', 'vendor')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser());

nunjucks.configure({ noCache: true });


mongoose.connect('mongodb://shopcms:shopcmspwd@database/shopcms');
// mongoose.connect('mongodb://database/shopcms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('connected');
  
  router(app);

  // Start server
  app.listen(8000, function () {
    console.log('server listening in http://localhost:8000');
  });

});


