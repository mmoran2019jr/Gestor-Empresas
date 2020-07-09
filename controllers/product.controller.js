'use strict'

var Product = require('../models/product.model');


function saveProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(
        params.productName &&
        params.brand &&
        params.inStock){

            Product.findOne({productName:params.productName},(err, productValidate) =>{
                if(err){
                    res.status(500).send({message:'Error General'});
                }else if(productValidate){
                    Product.findOneAndUpdate({productName: params.productName},{$inc:{inStock:params.inStock}},{new:true},(err,ProductUpdated)=>{
                        if(err){
                            res.status(500).send({message:'Error General'});
                        }else if(ProductUpdated){
                            res.send({Product:ProductUpdated});
                        }
                    });
                }else{
                    product.productName = params.productName;
                    product.brand = params.brand;
                    product.inStock = params.inStock;

                    product.save((err, productSaved)=>{
                        if(err){
                            res.status(500).send({message:'Error General'});
                        }else{
                            if(productSaved){
                                res.status(200).send({product:productSaved});
                            }else{
                                res.status(200).send({message:'Error al Guardar'});
                            }
                        }
                    });
                }
            });
        }else{
            res.send({message:'Ingrese datos por favor'});
        }
}

function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(productUpdated){
            res.send({product: productUpdated});
        }else{
            res.status(400).send({message: 'No se ha podido actualizar'});
        }
    });
}



module.exports = {
    saveProduct,
    updateProduct
}