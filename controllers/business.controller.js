'use strict'

var Business = require('../models/business.model');
var Employee = require('../models/employee.model');
var BranchOffice = require('../models/branchOffice.model');
var Product = require('../models/product.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveBusiness(req, res){
    var business = Business();
    var params = req.body;

    if( params.username &&
        params.password &&
        params.name && 
        params.address && 
        params.phone && 
        params.email && 
        params.activity){

           Business.findOne({name: params.name}, (err, businessFind)=>{
               if(err){
                res.status(500).send({message: 'Error general'});
               }else if(businessFind){
                res.send({message: 'Nombre ya utilizado'});
               }else{
                   business.username = params.username;
                   business.password = params.password;
                   business.name = params.name;
                   business.address = params.address;
                   business.phone = params.phone;
                   business.email = params.email;
                   business.activity = params.activity;

                   bcrypt.hash(params.password,null,null,(err, hashPassword)=>{
                       if(err){
                           res.status(500).send({message: 'Error de encriptacion'});
                       }else{
                           business.password = hashPassword;

                           business.save((err, businessSaved)=>{
                               if(err){
                                res.status(500).send({message:'Error general'});
                               }else if(businessSaved){
                                   res.send({Business: businessSaved});
                               }else{
                                res.send(418).send({message:'Usuario no guardado, intenta mas tarde'});
                               }
                           })
                       }
                   })
               }
           });

           
    }else{
        res.status(200).send({message: 'Porfavor ingrese todos los datos'})
    }
}

function login(req, res){
    var params = req.body;

    if(params.username){
        if(params.password){
            Business.findOne({$or:[{username: params.username}]}, (err, businessFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(businessFind){
                    bcrypt.compare(params.password, businessFind.password, (err, checkPassword)=>{
                        if(err){
                            res.status(500).send({message: 'Error al comparar contraseñas'});
                        }else if(checkPassword){
                            if(params.gettoken){
                                res.send({token: jwt.createToken(businessFind)});
                            }else{
                                res.send({business: businessFind});
                            }
                        }else{
                            res.status(418).send({message: 'Contraseña incorrecta'});
                        }
                    });
                }else{
                    res.send({message: 'Usuario no encontrado'});
                }
            });
        }else{
            res.send({message: 'Porfavor ingresa la contraseña'});
        }
    }else{
        res.send({message:'Ingrese el nombre del usuario'});
    }
}

function setEmployee(req, res){
    let businessId = req.params.id;
    let params = req.body;
    //let employee = new Employee();

    if(params.idEmployee){
            Business.findById(businessId, (err, businessFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(businessFind){
                    var idEmployee = params.idEmployee;
                    Business.findByIdAndUpdate(businessId, {$push:{employee: idEmployee}},{new: true}, (err, businessUpdated)=>{
                        if(err){    
                            res.status(500).send({message: 'Error general'});
                        }else if(businessUpdated){
                            res.status(200).send({businessUpdated: businessUpdated});
                        }else{
                            res.status(418).send({message: 'Error al actualizar'});
                        }
                    }) .populate('employee')
                }
            });
        }else{
            res.status(200).send({message: 'Faltan datos'});
        }
}

function countEmployee(req, res) {
    var businessId = req.params.id;

    Business.findById(businessId, (err, business) => {
        if(err){
            res.status(500).send({ message: 'Error general' });
        } else if (business) {
            res.status(200).send({ business: business.name, employees: 'Existen' + business.employees.length + ' empleados trabajando en la empresa' });
        } else {
            res.send(418).send({ message: 'No se encontraron empresas' });
        }
    });
}

function setBranchOffice(req, res){
    let businessId = req.params.id;
    let params = req.body;
    //let branchOffice = new branchOffice();

    if(params.idBranchOffice){
        Business.findById(businessId, (err, businessFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(businessFind){
                var idBranchOffice = params.idBranchOffice;
                Business.findByIdAndUpdate(businessId, {$push:{branchOffice: idBranchOffice}}, {new: true}, (err, businessUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(businessUpdated){
                        res.status(200).send({businessUpdated: businessUpdated});
                    }else{
                        res.status(418).send({message: 'Error al actualizar'});
                    }
                }) .populate('branchOffice')
            }
        });
    }else{
        res.status(200).send({message: 'Faltan datos'});
    }
}

function updateBusiness(req, res){
    var businessId = req.params.id;
    var update = req.body;

    if(businessId != req.business.sub){
        res.status(403).send({message: 'Error de permiso'});
    }
    Business.findByIdAndUpdate(businessId, update, {new: true}, (err, businessUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(businessUpdated){
            res.send({business: businessUpdated});
        }else{
            res.status(400).send({message: 'No se ha podido actualizar'});
        }
    });
}


function deleteBusiness(req, res){
    var businessId = req.params.id;

    Business.findByIdAndDelete(businessId, (err, businessDeleted)=>{
        if(err){
            res.status(500).save({message: 'Error general al eliminar'});
        }else if(businessDeleted){
            res.send({business: businessDeleted});
        }else{
            res.status(404).send({message: 'Error al eliminar'});
        }
    });
}

function listEmployees(req, res) {
    const businessId = req.params.id;
    Business.findById(businessId, (err, businessTotal)=>{
        if (err){
            res.status(500).send({message: 'Error en la base de datos'});
        }else if(businessTotal){
            res.send({Business: businessTotal.name, Employee: businessTotal.employee.length});
        }else{
            res.send({message: 'No se encontro ninguna empresa'});
        }
    });
}

function searchByNameBusiness(req,res){
    let id = req.params.id;
    let name = req.body.name;
    
        Product.findOne({name:{$regex:name,$options:'i'}},(err,productFound)=>{
            if(err){
                res.status(500).send({message:'Error de servidor'});
                console.log(err);
            }else if(productFound){
                Business.findById(id,(err,business)=>{
                    if(err){
                        res.status(500).send({message:'Error de servidor'});
                        console.log(err);
                    }else if(business){
                        business.products.forEach((product,i)=>{
                            if(productFound._id.equals(product)){
                                res.send(productFound);
                            }else{
                                res.status(404).send({message:'Producto no encontrado'});
                            }
                        });
                    }else{
                        res.send({message:'Empresa no encontrada'});
                    }
                });
            }else{
                res.status(404).send({message:'Producto no encontrado'});
            }
        });
}

function setProduct(req, res){
    let businessId = req.params.id;
    let params = req.body;

    if(params.idProduct){
        Business.findById(businessId, (err, businessFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(businessFind){
                var idProduct = params.idProduct;
                Business.findByIdAndUpdate(businessId,{$inc: {product: 1},$push:{products: idProduct}}, {new: true}, (err, businessUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(businessUpdated){
                        res.status(200).send({businessUpdated:businessUpdated});
                    }else{
                        res.status(418).send({message: 'Error al actualizar'})
                    }
                }) .populate('product')
            }
        });
    }else{
        res.status(200).send({message: 'Faltan Datos'});
    }
}

function listProducts(req, res) {
    const businessId = req.params.id;
    Business.findById(businessId, (err, businessTotal)=>{
        if (err){
            res.status(500).send({message: 'Error en la base de datos'});
        }else if(businessTotal){
            res.send({Business: businessTotal.name, Product: businessTotal.product.length});
        }else{
            res.send({message: 'No se encontro ninguna empresa'});
        }
    });
}


module.exports = {
    saveBusiness,
    login,
    updateBusiness,
    deleteBusiness,
    setEmployee,
    countEmployee,
    setBranchOffice,
    listEmployees,
    searchByNameBusiness,
    setProduct,
    listProducts
    
}