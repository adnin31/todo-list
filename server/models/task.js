"use-strict"
var mongoose = require('mongoose')
var Schema =  mongoose.Schema


var task = mongoose.Schema({
  task :{
    type : String,
    required :true
  },
  dueDate: Date
}, {
  timestamp : true
})
var task = mongoose.model('Task',task)
module.exports = task;
