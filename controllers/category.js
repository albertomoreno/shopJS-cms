
'use strict';

var Category = require('../models/Category');
var createSlug = require('slug');
var mongoose = require('mongoose');


module.exports = {
  check: function(req, res) {
    var value = req.body.value;

    return Category.find({name: value})
      .then(function(categories) {
        if(categories.length) {
          res.json({unique: false});
        }
        res.json({unique: true});
      });
  },

  createCategory: function(req, res) {
    var data = req.body;
    data.parent = data.parent ? mongoose.Types.ObjectId(data.parent) : null;
    data.slug = createSlug(data.name, {lower: true});
    data.published = !!data.published;

    var category = new Category(data);
    return category.save().then(function(category) {
      res.json(category);
    });
  },

  checkUpdate: function(req, res) {
    var category_id = req.params['category_id'];
    var value = req.body.value;

    return Category.find({name: value, _id: {$ne: mongoose.Types.ObjectId(category_id)} })
      .then(function(categories) {
        if(categories.length ) {

          res.json({unique: false});
        }
        res.json({unique: true});
      });
  },

  updateCategory: function(req, res) {

    var data = req.body;
    var id = data._id;

    return Category.findById(id)
      .then(function (category) {
        category.name = data.name;
        category.parent = data.parent ? mongoose.Types.ObjectId(data.parent) : null;
        category.slug = createSlug(data.name, {lower: true});
        category.published = !!data.published;

        return category.save();
      })
      .then(function (category) {
        return res.json(category);
      });

  },
};

