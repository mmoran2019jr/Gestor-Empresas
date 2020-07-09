'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = Schema({

        // datos de login
        username: String,
        password: String,

        name: String,
        address: String,
        phone: Number,
        email: String,
        activity: String,

        product:{type: Number,default:0},

        employee:[{
                type: Schema.Types.ObjectId, ref: 'employee'
        }],

        branchOffice:[{
                type: Schema.Types.ObjectId, ref: 'branchOffice'
        }],

        products: [{type: Schema.Types.ObjectId, ref: 'product'}]


         
});

module.exports = mongoose.model('business', businessSchema);