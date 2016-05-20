
'use strict';

var nunjucks = require('nunjucks');

var env = new nunjucks.Environment();

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
  }
}