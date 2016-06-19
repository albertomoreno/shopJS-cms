
'use strict';

var Category = require('../models/Category');


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

  get: function(req, res) {
    var id = req.body.id;

    Category.findOne({_id: id}).then(function (category) {
      return res.json({category: category});
    })

  },
};

