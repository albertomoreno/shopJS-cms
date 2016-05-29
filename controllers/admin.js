
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    Admin = require('../models/Admin'),
    Category = require('../models/Category'),
    bcrypt = require('bcryptjs'),
    createSlug = require('slug'),
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
  },

  createCategory: function(req, res) {

    var parent = req.param('parent');

    template.render(res, 'admin/category', {parent: parent, category: null});
  },

  updateCategory: function(req, res) {

    var id = req.body.id;
    var name = req.body.categoryName;
    var parent = req.body.parentId ? req.body.parentId : 0;
    var published = req.body.published ? true : false;
    var slug = createSlug(name, {lower: true});

    // Create new category
    if(id == '') {
      Category.find({name: name}, function(err, category) {
        if(err) {
          console.log(err);
          res.send(JSON.stringify({result: false, message: 'Ha ocurrido un error al guardar la categoria.'}));
        } else {
          if(category.length > 0) {
            res.send(JSON.stringify({result: false, message: 'Ya existe una categoria con ese nombre.'}));
          } else {
            var category = new Category({
              name: name,
              parent: parent,
              published: published,
              slug: slug,
            });

            category.save(function(err) {
              if(err) {
                console.log(err);
                res.send(JSON.stringify({result: false, message: 'Ha ocurrido un error al guardar la categoria.'}));
              } else {

                env.getParentCategories();
                var navbar = template.renderPartial('admin/navbar');
                res.send(JSON.stringify({result: true, message: navbar}));
              }
            })
          }
        }
      });
    }

  }
};

