'use strict';


var nunjucks = require('nunjucks');
var Shop = require('../models/Shop');
var Category = require('../models/Category');


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
  render: function(req, res, view, data) {
    if(!data) {
      data = {};
    }
    
    var content = nunjucks.render('views/' + view + '.nj', data);

    if(req.query.single) {
      return res.send(content);
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
        data.categories = makeTree(categories);
      })
      .catch(console.log.bind(console))
      .then(function() {
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
        data.content = content;
        res.send(nunjucks.render('views/base.nj', data));
      });
  },
  renderPartial: function(view, data) {
    return nunjucks.render('views/' + view + '.nj', data);
  },
};

