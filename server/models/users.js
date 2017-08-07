"use-strict"
var mongoose = require('mongoose')
var Schema =  mongoose.Schema

var task = mongoose.Schema({

  username :{
    type : String,
    required :true
  },
  email :{
    type : String,
    required :true
  },
  password:{
    type : String,
    required : true
  },
  key :{
    type: String,
    required :true
  }

})
var Transaction = mongoose.model('Transaction',transaction)
module.exports = Transaction;
