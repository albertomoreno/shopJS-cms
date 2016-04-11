
'use strict';

var express = require('express'),
    Admin = require('../models/Admin'),
    template = require('../lib/template.js');

module.exports = {
  home: function(req, res) {

    /*Admin.find({}, function(err, admin) {
      if (err) console.log(err);

      console.log(typeof admin);
    });*/

    template.render(res, 'home/home');
  },

  register: function(req, res) {
    template.render(res, 'home/register');
  }
};




