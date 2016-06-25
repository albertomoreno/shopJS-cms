'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = require('./Category');

var schema = new Schema({
  name: { type: String, required: true, unique: true  },
  category: { type: Schema.Types.ObjectId, ref: 'Category'},
  published: { type: Boolean, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  recommended_price: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  recommended_module: { type: Boolean, required: true },
});

var Product = mongoose.model('Product', schema);

module.exports = Product;
