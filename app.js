'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var businessRoutes = require('./routes/business.route');
var employeeRoutes = require('./routes/employee.route');
var branchOfficeRoutes = require('./routes/branchOffice.route');
var productRoutes = require('./routes/product.route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/business', businessRoutes);
app.use('/employee', employeeRoutes);
app.use('/branchOffice', branchOfficeRoutes);
app.use('/product', productRoutes);


module.exports = app;