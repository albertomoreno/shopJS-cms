
'use strict';

var express = require('express'),
    Shop = require('../models/Shop'),
    Admin = require('../models/Admin'),
    Product = require('../models/Product'),
    Category = require('../models/Category'),
    Page = require('../models/Page'),
    Visit = require('../models/Visit'),
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    createSlug = require('slug'),
    template = require('../lib/template.js');


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
          title: 'Estadisticas - ShopJS',
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

    var page = new Page(data);
    return page.save().then(function(page) {
      res.json(page);
    });
  }

};

