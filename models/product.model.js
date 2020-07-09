'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema =({
    productName: String,
    brand: String,
    inStock: Number
})

module.exports = mongoose.model('product', ProductSchema);