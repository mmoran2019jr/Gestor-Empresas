'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = Schema({

    name: String,
    lastName: String,
    DPI: String,
    age: String,
    phone: Number,
    email: String,
    job: String,
    department: String},

    {typeKey: '$type'


});

module.exports = mongoose.model('employee', employeeSchema);