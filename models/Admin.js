
'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true  },
  password: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
var Admin = mongoose.model('Admin', schema);

// make this available to our users in our Node applications
module.exports = Admin;