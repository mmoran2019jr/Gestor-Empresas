'use strict'

var express = require('express');
var employeeController = require('../controllers/employee.controller');

var api = express.Router();

api.post('/saveEmployee', employeeController.saveEmployee);
api.put('/updateEmployee/:id', employeeController.updateEmployee);
api.delete('/deleteEmployee/:id', employeeController.deleteEmployee);
api.get('/listEmployees', employeeController.listEmployees);
api.get('/searchEmployees', employeeController.searchEmployees);

module.exports = api;