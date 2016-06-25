
'use strict';

var template = require('../lib/template.js');

module.exports = {
  faq: function(req, res) {
    template.render(req, res, 'content/faq', {
      title: 'FAQ - ShopJS',
    });
  },

  terms: function(req, res) {
    template.render(req, res, 'content/terms', {
      title: 'Terminos y Condiciones - ShopJS',
    });
  },

  cookies: function(req, res) {
    template.render(req, res, 'content/cookies', {
      title: 'Politica y Cookies - ShopJS',
    });
  },
};




