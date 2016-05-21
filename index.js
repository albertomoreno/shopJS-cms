
'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    router = require('./router'),
    bodyParser = require('body-parser');


var app = express();


// Middlewares
app.use('/tmp/styles', express.static(path.join(__dirname, 'tmp', 'styles')));
app.use('/tmp/fonts', express.static(path.join(__dirname, 'tmp', 'fonts')));
app.use('/tmp/vendor', express.static(path.join(__dirname, 'tmp', 'vendor')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser());
app.use(session({
  secret: 'shopcms',
  cookie: { maxAge: 86400 }, // 1 day
  store: new MongoDBStore({
    uri: 'mongodb://shopcms:shopcmspwd@database/shopcms',
    collection: 'sessions'
  })
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});


nunjucks.configure({ noCache: true, express: app });


var env = new nunjucks.Environment();
env.addGlobal('themes', [
  'Default',
  'Cerulean',
  'Cosmo',
  'Flatly',
  'Journal',
  'Paper',
  'Readable',
  'Spacelab',
  'United',
  'Yeti',
]);

var Shop = require('./models/Shop');
Shop.find({}, function(err, shop) {
  if (err) console.log(err);

  if(shop.length == 0) {
    env.addGlobal('shop', null);
  } else {
    env.addGlobal('shop', shop[0]);
  }
});

env.express(app);

app.use(function(req, res, next) {
  env.addGlobal('user', req.session.user);

  next();
});


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


