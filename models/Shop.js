
'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({
  name: { type: String},
  theme: { type: String },
  navbar_inverse: { type: Boolean },
  address: { type: String },
  email: { type: String },
  phone: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

// the schema is useless so far
// we need to create a model using it
var Shop = mongoose.model('Shop', schema);

// make this available to our users in our Node applications
module.exports = Shop;