
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    bcrypt = require('bcryptjs'),
    env = require('../lib/env_template.js'),
    template = require('../lib/template.js');


module.exports = {
  changeTheme: function(req, res) {

    var theme = req.param('theme').toLowerCase();

    Shop.find({}, function(err, shop) {
      if (err) console.log(err);

      if(shop.length == 0) {
        var shop = new Shop({
          name: 'ShopJS CMS',
          theme: theme,
          navbar_inverse: true,
        });

        shop.save(function(err) {
          if (err) throw err;

          env.shop();
          // res.redirect('/');
          res.end('{"result": true}');
        });
      } else {
        shop[0].theme = theme;

        shop[0].save(function(err) {
          if (err) throw err;


          env.shop();
          // res.redirect('/');
          res.end('true');
        });
      }

    });
  },
};

