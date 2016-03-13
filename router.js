
var home = require('./controllers/home');
var content = require('./controllers/content');


module.exports = function(app) {
  app.use('/faq', content.faq);
  app.use('/', home.home);
};


