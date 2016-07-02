'use strict';


var express = require('express'),
    Admin = require('../models/Admin'),
    Category = require('../models/Category'),
    Page = require('../models/Page'),
    Product = require('../models/Product'),
    Shop = require('../models/Shop'),
    Visit = require('../models/Visit'),
    Service = require('../models/Service'),
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
      var services = [];
      Service.find({})
        .then(function (home_services) {
          services = home_services;

          for (var i = 0; i < 4; i++) {
            if(!services[i]) {
              services[i] = {position: i+1};
            }
          };


          return Product.find({published: true, recommended_module: true})
        })
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
                title: 'Inicio',
                recommended_products: recommended_products,
                new_products: new_products,
                viewed_products: viewed_products,
                services: services,
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

  },

  page: function(req, res) {

    var slug = req.params['pageSlug'];

    Page.findOne({slug: slug}).then(function (page) {
      template.render(req, res, 'home/page', {
        title: page.name,
        page: page,
      });
    });
  },

  contact: function(req, res) {

    template.render(req, res, 'home/contact', {
      title: 'Contacto',
    });

  },

  sendEmail: function(req, res) {

    var data = req.body;

    Shop.findOne({}).then(function (shop) {

      var message = "El usuario " + data.name + " con email " + data.email + " se pone en contacto con usted con el siguiente mensaje: \n";
      message += data.message;

      var sendgrid = require('sendgrid').mail;
      var from = new sendgrid.Email(shop.email);
      var to = new sendgrid.Email(shop.email);
      var subject = shop.name + ': Petición de contacto';
      var content = new sendgrid.Content("text/plain", message);
      var mail = new sendgrid.Mail(from, subject, to, content);

      var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
      var requestBody = mail.toJSON();
      var request = sg.emptyRequest();
      request.method = 'POST';
      request.path = '/v3/mail/send';
      request.body = requestBody;
      sg.API(request, function (response) {
        
        res.json({result: true});
      });

    });
  }

};




