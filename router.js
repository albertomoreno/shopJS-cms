
var home = require('./controllers/home'),
    admin = require('./controllers/admin'),
    content = require('./controllers/content');


module.exports = function(app) {
  app.get('/terminos-condiciones', content.terms);
  app.get('/cookies', content.cookies);
  app.get('/faq', content.faq);
  app.get('/registro', home.register);
  app.post('/registro', home.postRegister);
  app.get('/crear-categoria', admin.createCategory);
  app.post('/actualizar-categoria', admin.updateCategory);
  app.get('/cambiar-tema', admin.changeTheme);
  app.post('/login', admin.login);
  app.get('/logout', admin.logout);
  app.get('/', home.home);
};


