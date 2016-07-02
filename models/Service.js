
'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({
  name: { type: String, required: true},
  position: { type: Number, required: true},
  icon: { type: String, required: true},
  text: { type: String, required: true},
});

// the schema is useless so far
// we need to create a model using it
var Service = mongoose.model('Service', schema);

// make this available to our users in our Node applications
module.exports = Service;