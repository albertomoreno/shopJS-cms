
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
};

