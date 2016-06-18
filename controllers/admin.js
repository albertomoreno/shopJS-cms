
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    Admin = require('../models/Admin'),
    Category = require('../models/Category'),
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    createSlug = require('slug'),
    template = require('../lib/template.js');


module.exports = {
  changeTheme: function(req, res) {

    var theme = req.params['theme'];

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

          return res.redirect('back');
        });
      } else {
        shop[0].theme = theme;

        shop[0].save(function(err) {
          if (err) throw err;

          return res.redirect('back');
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
    req.session.user = null;

    res.redirect('/');
  },

  createCategory: function(req, res) {
    var data = req.body;
    data.parent = data.parent ? mongoose.Types.ObjectId(data.parent) : null;
    data.slug = createSlug(data.name, {lower: true});
    data.published = !!data.published;

    var category = new Category(data);
    return category.save().then(function(category) {
      res.json(category);
    });
  },

  reloadNavbar: function(req, res) {
    template.render(req, res, 'navbar', null, true);
  }
};

