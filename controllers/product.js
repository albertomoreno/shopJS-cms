'use strict';


var template = require('../lib/template.js');
var Product = require('../models/Product');
var createSlug = require('slug');
var mongoose = require('mongoose');
var fs = require('fs');

module.exports = {
  list: function(req, res) {
    var slug = req.params['category'];

    template.render(req, res, 'product/list', {
      title: 'Productos - ShopJS',
    });
  },

  product: function(req, res) {
    var slug = req.params['slug'];
    

    template.render(req, res, 'product/product', {
      title: 'Producto - ShopJS',
    })
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
};

