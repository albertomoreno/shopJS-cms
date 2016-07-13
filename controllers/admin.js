
'use strict';

var express = require('express');
var Shop = require('../models/Shop');
var Admin = require('../models/Admin');
var Product = require('../models/Product');
var Category = require('../models/Category');
var Page = require('../models/Page');
var Shop = require('../models/Shop');
var Visit = require('../models/Visit');
var Service = require('../models/Service');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var createSlug = require('slug');
var template = require('../lib/template.js');
var fs = require('fs');


var STATS_MINUTES = 40;


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
          return res.json({result: true});
        } else {
          return res.json({result: false});
        }

      } else {
        return res.json({result: false});
      }

    });
  },

  logout: function(req, res) {
    req.session.user = null;

    res.redirect('/');
  },

  reloadNavbar: function(req, res) {
    template.render(req, res, 'navbar', null, true);
  },

  statistics: function(req, res) {

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

        var products = views_products;

        template.render(req, res, 'admin/statistics', {
          title: 'Estadisticas',
          products: products,
        });
        
      });

    });

  },

  statsData: function(req, res) {
    var date = new Date();
    date.setSeconds(0);
    date.setTime(date.getTime() - (STATS_MINUTES-1)*60*1000);

    Visit.aggregate([
      {'$match':{'date': {'$gt': date}}},
      {"$group": {
        "_id": {
          "hour": {"$hour": "$date"},
          "minute": {"$minute": "$date"},
        },
        "count": { "$sum": 1 }
      },
    }], function (err, result) {

      var visits = [];

      var time = new Date(date.getTime());
      var current = 0;

      result = result.reverse();

      for (var i = 0; i < STATS_MINUTES; i++) {
        var count = 0;
        if(current < result.length && result[current]._id.hour === time.getHours() && result[current]._id.minute === time.getMinutes()) {
          count = result[current].count;
          current++;
        }
        visits.push({time: time.getTime(), count: count});

        time.setTime(time.getTime()+60*1000);
      };

      res.json(visits);
    });
  },

  pageCheck: function(req, res) {
    var value = req.body.value;

    return Page.find({name: value})
      .then(function(pages) {
        if(pages.length) {
          res.json({unique: false});
        }
        res.json({unique: true});
      });
  },

  createPage: function(req, res) {

    var data = req.body;
    data.slug = createSlug(data.name, {lower: true});
    data.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure veniam maiores, earum, enim, tenetur vero inventore assumenda accusantium tempora aliquid maxime delectus dolorem molestias sunt soluta laboriosam. Obcaecati, temporibus, vero.'

    var page = new Page(data);
    return page.save().then(function(page) {
      res.json(page);
    });
  },

  updatePage: function(req, res) {

    var page_id = req.params['page'];

    var content = req.body.content;

    Page.findById(page_id)
      .then(function (page) {
        page.content = content;

        return page.save();
      })
      .then(function (updated_page) {
        res.json({result: true});
      });

  },

  updateShop: function(req, res) {

    var data = req.body;

    return Shop.findOne({})
      .then(function (shop) {

        shop.name = data.name;
        shop.address = data.address;
        shop.email = data.email;
        shop.phone = data.phone;
        shop.latitude = data.latitude;
        shop.longitude = data.longitude;

        return shop.save();
      })
      .then(function (shop) {
        return res.json(shop);
      });

  },

  uploadCarouselImage: function(req, res) {

    var position = req.params['position'];
    var buffer_image = req.body;

    var wstream = fs.createWriteStream('images/carousel/img' + position + '.jpg');
    wstream.write(buffer_image);
    wstream.end();

    wstream.on('finish', function() {
      res.json({result: true});
    });

  },

  uploadService: function(req, res) {

    var position = req.params['position'];

    var data = req.body;

    Service.findOne({position: position})
      .then(function (service) {

        if(!service) {
          service = new Service;
          service.position = position;
        }

        service.name = data.name;
        service.icon = data.icon;
        service.text = data.text;

        return service.save();
      })
      .then(function (service) {
        return res.json({result: true});
      })
      .catch(function (err) {
        console.log(err);
      });

  },

  reloadScripts: function(req, res) {
    template.render(req, res, 'scripts', null, true);
  },

};

