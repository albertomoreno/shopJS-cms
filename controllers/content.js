
'use strict';

var express = require('express'),
    template = require('../lib/template.js');

module.exports = {
  faq: function(req, res) {
    template.render(res, 'content/faq');
  },

  terms: function(req, res) {
    template.render(res, 'content/terms');
  },
};




