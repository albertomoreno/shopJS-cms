'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true, unique: true  },
  slug: { type: String, required: true },
  content: { type: String },
});

var Page = mongoose.model('Page', schema);

module.exports = Page;
