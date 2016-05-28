
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

/*env.addGlobal('getParentCategories', function() {
  Category.find({parent: 0}, function(err, categories) {
    if(err) throw err;

    return JSON.parse(['cat1', 'cat2']);
    // return categories;
  })
});*/

var Category = require('../models/Category');
Category.find({parent: 0}, function(err, categories) {
  if(err) console.log(err);

  if(categories.length == 0) {
    env.addGlobal('getParentCategories', null);
  } else {
    env.addGlobal('getParentCategories', categories);
  }
});

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
  },
  getParentCategories: function() {
    var Category = require('../models/Category');
    Category.find({parent: 0}, function(err, categories) {
      if(err) console.log(err);

      if(categories.length == 0) {
        env.addGlobal('getParentCategories', null);
      } else {
        env.addGlobal('getParentCategories', categories);
      }
    });
  },
}