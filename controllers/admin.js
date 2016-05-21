
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    Admin = require('../models/Admin'),
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

  login: function(req, res) {

    var email = req.param('email');
    var password = req.param('password');

    Admin.find({email: email}, function(err, admin) {
      if(err) throw err;

      if(admin.length > 0) {

        var cmp = bcrypt.compareSync(password, admin[0].password);

        if(cmp) {
          req.session.user = admin[0].email;
          env.user(admin[0].email);
          res.send('true');
        } else {
          res.send('false');
        }

      } else {
        res.send('false');
      }

    });
  },

  logout: function(req, res) {
    env.user(null);
    req.session.user = null;

    res.redirect('/');
  }
};

