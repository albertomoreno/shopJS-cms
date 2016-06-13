
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    Admin = require('../models/Admin'),
    Category = require('../models/Category'),
    bcrypt = require('bcryptjs'),
    createSlug = require('slug'),
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

          // res.redirect('/');
          res.end('{"result": true}');
        });
      } else {
        shop[0].theme = theme;

        shop[0].save(function(err) {
          if (err) throw err;


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
    var id = req.body.id;
    var name = req.body.categoryName;
    var parent = req.body.parentId ? req.body.parentId : null;
    var published = req.body.published ? true : false;
    var slug = createSlug(name, {lower: true});

    return Category.find({name: name})
      .then(function(categories) {
        if(categories.length) {
          return Promise.reject('Ya existe una categoria con ese nombre.');
        }

        var category = new Category({
          name: name,
          parent: parent,
          published: published,
          slug: slug,
        });

        return category.save();
      })
      .then(function() {
        res.json({succes: true});
      });
  },
};

