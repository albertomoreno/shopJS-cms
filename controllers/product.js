'use strict';


var template = require('../lib/template.js');

module.exports = {
  list: function(req, res) {
    var slug = req.params['category'];

    template.render(req, res, 'product/list', {
      title: 'Productos - ShopJS',
    });
  },
};

