'use strict'

var Employee = require('../models/employee.model');

function saveEmployee(req, res){
    var employee = Employee();
    var params = req.body;

    if(params.name &&
        params.lastName &&
        params.DPI && 
        params.age &&
        params.phone &&
        params.email && 
        params.job && 
        params.department){
        
            Employee.findOne({DPI: params.DPI}, (err, employeeFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(employeeFind){
                    res.send({message: 'DPI ya utilizado'});
                }else{
                    employee.name = params.name;
                    employee.lastName = params.lastName;
                    employee.DPI = params.DPI;
                    employee.age = params.age;
                    employee.phone = params.phone;
                    employee.email = params.email;
                    employee.job = params.job;
                    employee.department = params.department;

                    employee.save((err, employeeSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general'});
                        }else if(employeeSaved){
                            res.status(200).send({employee: employeeSaved});
                        }else{
                            res.send(418).send({message:'Empleado no guardado, intenta mas tarde'});
                        }
                    });

                }
            });

            
    }else{
        res.status(200).send({message: 'Porfavor ingrese todos los datos'});  
    }
}


function updateEmployee(req, res){
    var employeeId = req.params.id;
    var update = req.body;

    Employee.findByIdAndUpdate(employeeId, update, {new: true}, (err, employeeUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(employeeUpdated){
            res.send({employee: employeeUpdated});
        }else{
            res.status(400).send({message: 'No se ha podido actualizar'});
        }
    });
}

function deleteEmployee(req, res){
    var employeeId = req.params.id;

    Employee.findByIdAndDelete(employeeId, (err, employeeDeleted)=>{
        if(err){
            res.status(500).save({message: 'Error general al eliminar'});
        }else if(employeeDeleted){
            res.send({employee: employeeDeleted});
        }else{
            res.status(404).send({message: 'Error al eliminar'});
        }
    });
}

function listEmployees(req, res){
    Employee.find({}).exec((err, employeers)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'})

        }else{
            if(Employee){
                res.status(200).send({todosLosEmpleados: employeers});
            }else{
                res.status(200).send({message: "No se obtuvieron datos"});
            }
        }
    })
}

function searchEmployees(req, res) {
    const text = req.body.search;
    Employee.find({
        $or: [{
            'name': {
                $regex: text, $options: 'i'
            }
        }, {
            'lastName': {   
                $regex: text, $options: 'i'
            }
        }, {
            'job': {
                $regex: text, $options: 'i'
            }
        }, {
            'department': {
                $regex: text, $options: 'i'
            }
            
        }]
    }, (err, employees) => {
        if (err) {
            res.status(500).send({
                message: 'Error general', err
            });
        } else if (employees) {
            res.status(200).send({
                Employees: employees
            })
        } else {
            res.status(200).send({
                message: 'No hay empleados'
            });
        }
    });
}



module.exports = {
    saveEmployee,
    updateEmployee,
    deleteEmployee,
    listEmployees,
    searchEmployees,
}