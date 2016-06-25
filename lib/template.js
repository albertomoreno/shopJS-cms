'use strict';


var nunjucks = require('nunjucks');
var Shop = require('../models/Shop');
var Category = require('../models/Category');
var Page = require('../models/Page');


var makeTree = function(categories, parent) {
  var result = categories
    .map(function (category) {
      return category.toObject();
    })
    .filter(function (category) {
      return parent ? (category.parent && category.parent.equals(parent)) : !category.parent;
    });

  result.forEach(function(category) {
    category.children = makeTree(categories, category._id);
  });

  return result;
};



module.exports = {
  render: function(req, res, view, data, single) {
    if(!data) {
      data = {};
    }

    Shop.find({})
      .then(function(shops) {
        if(shops.length) {
          data.shop = shops[0];
        }
      })
      .then(function() {
        return Category.find({})
      })
      .then(function(categories) {
        data.adminCategories = makeTree(categories);
        data.categories = makeTree(categories.filter(function(category) {
          return category.published;
        }));
      })
      .catch(console.log.bind(console))
      .then(function() {

        return Page.find({});
      }).then(function (pages) {

        data.pages = pages;

        data.themes = [
          'default',
          'cerulean',
          'cosmo',
          'flatly',
          'journal',
          'paper',
          'readable',
          'spacelab',
          'united',
          'yeti',
        ];

        data.user = req.session.user;
        
        var content = nunjucks.render('views/' + view + '.nj', data);
        if(req.query.single || single) {
          return res.send(content);
        }

        data.content = content;
        res.send(nunjucks.render('views/base.nj', data));
        
      });


  },
  renderPartial: function(view, data) {
    return nunjucks.render('views/' + view + '.nj', data);
  },
};

