'use strict'

var BranchOffice = require('../models/branchOffice.model');


function saveBranchOffice(req, res){
    var params = req.body;
    var branchOffice = new BranchOffice();

   if( params.code &&
       params.country &&
        params.address &&
        params.phone &&
        params.email){

            BranchOffice.findOne({code: params.code}, (err, branchOfficeFind)=>{
              if(err){
                res.status(500).send({message: 'Error general'});
              }else if(branchOfficeFind){
                res.send({message: 'codigo ya utilizado'});
              }else{
                  branchOffice.code = params.code;
                  branchOffice.country = params.country;
                  branchOffice.address = params.address;
                  branchOffice.phone = params.phone;
                  branchOffice.email = params.email;
                  
                  branchOffice.save((err, branchOfficeSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general'});
                        }else if(branchOfficeSaved){
                            res.send({BranchOffice: branchOfficeSaved});
                        }else{
                            res.send(418).send({message: 'Sucursal no guardada'});
                        }
                  });
              }
            });
        }else{
            res.send({message: 'Ingrese todos los datos'});
        }
}

/*function setEmployee(req, res){
    let branchOfficeId = req.params.id;
    let params = req.body;

    if(params.idEmployee){
        BranchOffice.findById(branchOfficeId, (err, branchOfficeFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(branchOfficeFind){
                var idEmployee = params.idEmployee;
                BranchOffice.findByIdAndUpdate(branchOfficeId, {$push:{employee: idEmployee}},{new: true}, (err, branchOfficeUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general2'});
                    }else if(branchOfficeUpdated){
                        res.status(200).send({branchOfficeUpdated: branchOfficeUpdated});
                    }else{
                        res.status(418).send({message: 'Error al actualizar'});
                    }
                }) .populate('employee');
            }
        });
    }else{
        res.status(200).send({message: 'Faltan datos'});
    }

}*/

function setProduct(req, res){
    let branchOfficeId = req.params.id;
    let params = req.body;

    if(params.idProduct){
        BranchOffice.findById(branchOfficeId, (err, branchOfficeFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(branchOfficeFind){
                var idProduct = params.idProduct;
                BranchOffice.findByIdAndUpdate(branchOfficeId,{$push:{products: idProduct}}, {new: true}, (err, branchOfficeUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(branchOfficeUpdated){
                        res.status(200).send({branchOfficeUpdated:branchOfficeUpdated});
                    }else{
                        res.status(418).send({message: 'Error al actualizar'})
                    }
                });
            }
        });
    }else{
        res.status(200).send({message: 'Faltan Datos'});
    }
}

function updateBranchOffice(req, res){
    var branchOfficeId = req.params.id;
    var update = req.body;

    BranchOffice.findByIdAndUpdate(branchOfficeId, update, {new: true}, (err, branchOfficeUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(branchOfficeUpdated){
            res.send({branchOffice: branchOfficeUpdated});
        }else{
            res.status(400).send({message: 'No se ha podido actualizar'});
        }
    });
}

function deleteBranchOffice(req, res){
    var branchOfficeId = req.params.id;

    BranchOffice.findByIdAndDelete(branchOfficeId, (err, branchOfficeDeleted)=>{
        if(err){
            res.status(500).save({message: 'Error general al eliminar'});
        }else if(branchOfficeDeleted){
            res.send({branchOffice: branchOfficeDeleted});
        }else{
            res.status(404).send({message: 'Error al eliminar'});
        }
    });
}

function listBranchOffices(req, res){
    BranchOffice.find({}).exec((err, branchOffices)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'})

        }else{
            if(BranchOffice){
                res.status(200).send({todasLasSucursales: branchOffices});
            }else{
                res.status(200).send({message: "No se obtuvieron datos"});
            }
        }
    })
}

function searchByNameBranch(req,res){
    let id = req.params.id;
    let name = req.body.name;
    
        Product.findOne({name:{$regex:name,$options:'i'}},(err,productFound)=>{
            if(err){
                res.status(500).send({message:'Error de servidor'});
                console.log(err);
            }else if(productFound){
                BranchOffice.findById(id,(err,branch)=>{
                    if(err){
                        res.status(500).send({message:'Error de servidor'});
                        console.log(err);
                    }else if(branch){
                        branch.products.forEach((product,i)=>{
                            if(productFound._id.equals(product)){
                                res.send(productFound);
                            }else{
                                res.status(404).send({message:'Producto no encontrado'});
                            }
                        });
                    }else{
                        res.send({message:'Sucursal no encontrada'});
                    }
                });
            }else{
                res.status(404).send({message:'Producto no encontrado'});
            }
        });
}


module.exports = {
    saveBranchOffice,
    setProduct,
    updateBranchOffice,
    deleteBranchOffice,
    listBranchOffices,
    searchByNameBranch

}