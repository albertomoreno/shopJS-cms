
'use strict';

var express = require('express'),
    template = require('../lib/template.js');

module.exports = {
  home: function(req, res) {
    template.render(res, 'home/home');
  },
};


