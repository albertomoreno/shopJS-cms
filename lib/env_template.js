
'use strict';

var nunjucks = require('nunjucks');

var env = new nunjucks.Environment();

env.addGlobal('themes', [
  'default',
  'cerulean',
  'cosmo',
  'flatly',
  'journal',
  'paper',
  'readable',
  'spacelab',
  'united',
  'yeti',
]);

var Shop = require('../models/Shop');
Shop.find({}, function(err, shop) {
  if (err) console.log(err);

  if(shop.length == 0) {
    env.addGlobal('shop', null);
  } else {
    env.addGlobal('shop', shop[0]);
  }
});

module.exports = {
  shop: function() {
    var Shop = require('../models/Shop');
    Shop.find({}, function(err, shop) {
      if (err) console.log(err);

      if(shop.length == 0) {
        env.addGlobal('shop', null);
      } else {
        env.addGlobal('shop', shop[0]);
      }
    });
  },
  user: function(user) {
    env.addGlobal('user', user);
  }
}