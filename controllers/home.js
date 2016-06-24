'use strict';


var express = require('express'),
    Admin = require('../models/Admin'),
    Category = require('../models/Category'),
    Product = require('../models/Product'),
    Visit = require('../models/Visit'),
    bcrypt = require('bcryptjs'),
    template = require('../lib/template.js');


module.exports = {
  home: function(req, res) {

    Admin.find({}, function(err, admin) {
      if (err) console.log(err);

      // if not exist admin user
      if(admin.length == 0) {
        return res.redirect('/registro');
      }


      var recommended_products = [];
      var new_products = [];
      var viewed_products = [];
      Product.find({published: true, recommended_module: true})
        .then(function (products) {
          recommended_products = products.sort(function() {
            return .5 - Math.random();
          }).slice(0, 8);

          return Product.find({published: true}).sort({date: 'desc'});          
        }).then(function (new_products) {
          new_products = new_products;

          Visit.aggregate([
            {"$group": {
              "_id": "$product",
              "count": { "$sum": 1 }
            }},
            { "$sort": { "count": -1 } },
            { "$limit": 8 }
          ])
          .exec(function (err, visits) {
            Product.populate(visits, {path: '_id'}).then(function (views_products) {
              viewed_products = views_products;
              
              template.render(req, res, 'home/home', {
                title: 'ShopJS',
                recommended_products: recommended_products,
                new_products: new_products,
                viewed_products: viewed_products,
              });
            });

          });

        });

    });

  },

  register: function(req, res) {
    template.render(res, 'home/register');
  },

  postRegister: function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    // res.send(name + ' ' + email + ' ' + password);

    // encriptar contraseña
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var admin = new Admin({
      name: name,
      email: email,
      password: hash,
    });

    admin.save(function(err) {
      if (err) throw err;

      res.redirect('/');
    });

  }
};




