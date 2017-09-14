"use-strict"
var mongoose = require('mongoose')
var Schema =  mongoose.Schema

var users = mongoose.Schema({

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
  },
  task :[
    {type : Schema.Types.ObjectId, ref : 'Task'}
  ],
  role: String

})
var User = mongoose.model('User',users)
module.exports = User;
