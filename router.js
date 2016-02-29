
var home = require('./controllers/home');


module.exports = function(app) {
  app.use('/', home.home);
};
