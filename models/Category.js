
'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({
  name: { type: String, required: true, unique: true  },
  parent: { type: Schema.Types.ObjectId},
  published: { type: Boolean, required: true },
  slug: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('Category', schema);

// make this available to our users in our Node applications
module.exports = Category;