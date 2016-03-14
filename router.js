
var home = require('./controllers/home');
var content = require('./controllers/content');


module.exports = function(app) {
  app.use('/terminos-condiciones', content.terms);
  app.use('/faq', content.faq);
  app.use('/', home.home);
};


