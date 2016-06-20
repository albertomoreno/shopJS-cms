
var home = require('./controllers/home'),
    admin = require('./controllers/admin'),
    category = require('./controllers/category'),
    product = require('./controllers/product'),
    content = require('./controllers/content');


module.exports = function(app) {
  app.get('/terminos-condiciones', content.terms);
  app.get('/cookies', content.cookies);
  app.get('/faq', content.faq);

  app.get('/registro', home.register);
  app.post('/registro', home.postRegister);

  app.post('/crear-categoria', category.createCategory);
  app.post('/category/get', category.get);
  // app.post('/actualizar-categoria', admin.updateCategory);
  app.post('/category-check', category.check);

  app.get('/productos/:category', product.list);
  app.get('/producto/:slug', product.product);

  app.get('/cambiar-tema/:theme', admin.changeTheme);
  
  app.get('/reload-navbar', admin.reloadNavbar);
  
  app.post('/login', admin.login);
  app.get('/logout', admin.logout);
  
  app.get('/', home.home);
};


