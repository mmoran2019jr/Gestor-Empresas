'use strict'

var express = require('express');
var branchOfficeController = require('../controllers/branchOffice.controller');
var middlewareAuth = require('../middlewares/aunthenticated');
var connectMultiparty = require('connect-multiparty');

var api = express();

// Pendiente validacion

api.post('/saveBranchOffice', branchOfficeController.saveBranchOffice);
api.put('/setProduct/:id', branchOfficeController.setProduct);
//api.put('/setEmployee/:id', branchOfficeController.setEmployee);
api.put('/updateBranchOffice/:id',  branchOfficeController.updateBranchOffice);
api.delete('/deleteBranchOffice/:id', branchOfficeController.deleteBranchOffice);
api.get('/listBranchOffices', branchOfficeController.listBranchOffices);

module.exports = api;