'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchOfficeSchema = Schema({

    code: Number,
    country: String,
    address: String,
    phone: Number,
    email: String,
    products: [{type: Schema.Types.ObjectId, ref: 'product'}]
});

module.exports = mongoose.model('branchOffice', branchOfficeSchema);