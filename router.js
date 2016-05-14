
var home = require('./controllers/home');
var content = require('./controllers/content');


module.exports = function(app) {
  app.get('/terminos-condiciones', content.terms);
  app.get('/cookies', content.cookies);
  app.get('/faq', content.faq);
  app.get('/registro', home.register);
  app.post('/registro', home.postRegister);
  app.get('/', home.home);
};


