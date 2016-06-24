'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product'},
  date: { type: Date, required: true },
});

var Visit = mongoose.model('Visit', schema);

module.exports = Visit;
