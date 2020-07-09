'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'clave_secreta'; 

exports.createToken = (business)=>{
    var paylod ={
        sub: business._id,
        name: business.name,
        username: business.username,
        iat: moment().unix(),
        exp: moment().add(20, "minutes").unix()
    }
    return jwt.encode(paylod, key);
}
