
'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    router = require('./router'),
    slug = require('slug'),
    Promise = require('promise'),
    bodyParser = require('body-parser');

require('promise/lib/rejection-tracking').enable();

var app = express();

// Middlewares
app.use('/tmp/styles', express.static(path.join(__dirname, 'tmp', 'styles')));
app.use('/tmp/fonts', express.static(path.join(__dirname, 'tmp', 'fonts')));
app.use('/tmp/vendor', express.static(path.join(__dirname, 'tmp', 'vendor')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser());
app.use(session({
  secret: 'shopcms',
  cookie: { maxAge: 1000*60*60*24 }, // 1 day
  store: new MongoDBStore({
    uri: 'mongodb://shopcms:shopcmspwd@database/shopcms',
    collection: 'sessions'
  })
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});
app.use(function(req, res, next) {
  Promise.resolve(next()).catch(function (err) {
    throw err;
  });

});


nunjucks.configure({ noCache: true, express: app });


mongoose.connect('mongodb://shopcms:shopcmspwd@database/shopcms');
// mongoose.connect('mongodb://database/shopcms');

slug.defaults.mode = 'rfc3986';


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


