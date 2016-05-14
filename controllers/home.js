
'use strict';

var express = require('express'),
    Admin = require('../models/Admin'),
    bcrypt = require('bcryptjs'),
    template = require('../lib/template.js');

module.exports = {
  home: function(req, res) {

    Admin.find({}, function(err, admin) {
      if (err) console.log(err);

      // if not exist admin user
      if(admin.length == 0) {
        res.redirect('/registro');
        // template.render(res, 'home/register');
      } else {
        template.render(res, 'home/home');
      }
    });

  },

  register: function(req, res) {
    template.render(res, 'home/register');
  },

  postRegister: function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    // res.send(name + ' ' + email + ' ' + password);

    // encriptar contraseña
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var admin = new Admin({
      name: name,
      email: email,
      password: hash,
    });

    admin.save(function(err) {
      if (err) throw err;

      res.redirect('/');
    });

  }
};




