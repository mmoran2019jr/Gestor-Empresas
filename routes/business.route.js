'use strict'

var express = require('express');
var businessController = require('../controllers/business.controller');
var middlewareAuth = require('../middlewares/aunthenticated');
var connectMultiparty = require('connect-multiparty');


var api = express.Router();

api.post('/saveBusiness', businessController.saveBusiness);
api.post('/login',businessController.login);
api.put('/updateBusiness/:id', middlewareAuth.ensureAuthBusiness,businessController.updateBusiness);
api.delete('/deleteBusiness/:id', businessController.deleteBusiness); 
api.put('/setEmployee/:id', middlewareAuth.ensureAuthBusiness ,businessController.setEmployee);
api.put('/setBranchOffice/:id',middlewareAuth.ensureAuthBusiness ,businessController.setBranchOffice);
api.put('/setProduct/:id', middlewareAuth.ensureAuthBusiness, businessController.setProduct);
api.get('/listEmployees/:id',businessController.listEmployees);  
api.get('/listProducts/:id',businessController.listProducts);
api.get('/searchByNameBusiness', businessController.searchByNameBusiness);


module.exports = api;