"use-strict"

var jwt =require('jsonwebtoken');
require('dotenv').config();

function authAdmin(req,res,next) {
    var token = req.headers.token
    console.log(req.headers.token);
    if (token) {
      jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=> {
        if (decoded.username) {
          return next()
        }else {
          res.status(500).send('not authorized')
        }
      })
    }
    else {
      res.send("404 Not Found")
    }

 }

module.exports ={authAdmin} ;
