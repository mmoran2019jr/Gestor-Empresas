'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'clave_secreta';

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'Petición sin autorización'});
    }else{
        var token = req.headers.authorization.replace(/["']+/g,'');
        try{
            var payload = jwt.decode(token,key);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message:'Token expirado'});
            }
        }catch(ex){
            return res.status(404).send({message:'Token no válido'});

        }
        req.user = payload;
        next();
    }
}

exports.ensureAuthBusiness = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'Petición sin autorización'});
    }else{
        var token = req.headers.authorization.replace(/['"]+/g, '')
    }try{
        var payload1 = jwt.decode(token, key);
        if(payload1.exp <= moment().unix()){
            return res.status(401).send({message: 'Token expirado'});
        }else if(!payload1.username){
            return res.status(401).send({message: 'Token no admitido'});
        }
    }catch(exp){
        return res.status(404).send({message:'Token no válido'});
    }
    req.business = payload1;
    next();
}

