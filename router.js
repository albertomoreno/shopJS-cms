
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
  app.post('/actualizar-categoria', category.updateCategory);
  app.post('/category-check', category.check);
  app.post('/category/check/:category_id', category.checkUpdate);

  app.post('/productos/subir-imagen/:product_id', product.uploadImage);
  app.post('/productos/crear', product.createProduct);
  app.get('/productos/:category', product.list);
  app.get('/producto/:slug', product.product);
  app.post('/product/check', product.check);

  app.get('/cambiar-tema/:theme', admin.changeTheme);
  
  app.get('/reload-navbar', admin.reloadNavbar);
  
  app.get('/estadisticas', admin.statistics);
  app.get('/stats/data', admin.statsData);
  app.post('/login', admin.login);
  app.get('/logout', admin.logout);
  
  app.get('/', home.home);
};


