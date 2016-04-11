
var home = require('./controllers/home');
var content = require('./controllers/content');


module.exports = function(app) {
  app.use('/terminos-condiciones', content.terms);
  app.use('/cookies', content.cookies);
  app.use('/faq', content.faq);
  app.use('/register', home.register);
  app.use('/', home.home);
};


