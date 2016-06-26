'use strict';


var template = require('../lib/template.js');
var Product = require('../models/Product');
var Category = require('../models/Category');
var Visit = require('../models/Visit');
var createSlug = require('slug');
var mongoose = require('mongoose');
var fs = require('fs');

module.exports = {
  list: function(req, res) {
    var slug = req.params['category'];

    Category.findOne({slug: slug})
      .then(function (category) {
        Product.find({category: category._id, published: true}).then(function (products) {
          template.render(req, res, 'product/list', {
            title: 'Productos ' + category.name,
            category: category,
            products: products,
          });
        });
      });

  },

  product: function(req, res) {
    var slug = req.params['slug'];
    
    Product.findOne({slug: slug}).then(function (product) {

      Product.find({category: product.category, _id: {$ne: mongoose.Types.ObjectId(product._id)} }).then(function (products) {
        var related_products = products.sort(function() {
          return .5 - Math.random();
        }).slice(0, 4);

        var visit = new Visit({
          product: mongoose.Types.ObjectId(product._id),
          date: new Date()
        });
        
        visit.save().then(function (visit) {
          template.render(req, res, 'product/product', {
            title: product.name,
            product: product,
            related_products: related_products,
          });
        });

      });


    });

  },

  check: function(req, res) {
    var value = req.body.value;

    return Product.find({name: value})
      .then(function(products) {
        if(products.length) {
          res.json({unique: false});
        }
        res.json({unique: true});
      });
  },

  createProduct: function(req, res) {

    var data = req.body;

    data.slug = createSlug(data.name, {lower: true});
    data.published = !!data.published;
    data.recommended_module = !!data.recommended_module;
    data.category = data.category ? mongoose.Types.ObjectId(data.category) : null;
    data.date = new Date();

    var product = new Product(data);
    return product.save().then(function (product) {
      return res.json({product: product._id});
    }).catch(function(err) {
      console.log(err);
    });
  },

  uploadImage: function(req, res) {
    var product_id = req.params['product_id'];
    var buffer_image = req.body;

    Product.findById(product_id).then(function (product) {

      var wstream = fs.createWriteStream('images/products/' + product_id + '.jpg');
      wstream.write(buffer_image);
      wstream.end();

      wstream.on('finish', function() {
        res.json({result: true});
      });
    });
    
  },

  updateCheck: function(req, res) {
    var product_id = req.params['product'];
    var value = req.body.value;

    return Product.find({name: value, _id: {$ne: mongoose.Types.ObjectId(product_id)} })
      .then(function(products) {
        if(products.length ) {

          res.json({unique: false});
        }
        res.json({unique: true});
      });
  },

  updateProduct: function(req, res) {
    var data = req.body;
    var id = data._id;

    return Product.findById(id)
      .then(function (product) {

        product.name = data.name;
        product.category = data.category;
        product.slug = createSlug(data.name, {lower: true});
        product.published = !!data.published;
        product.recommended_module = !!data.recommended_module;
        product.price = data.price;
        product.recommended_price = data.recommended_price;
        product.description = data.description;

        return product.save();
      })
      .then(function (product) {
        return res.json(product);
      });
  },
};

