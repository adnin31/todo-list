const task = require('../models/task.js')
const user = require('../models/users.js')
var jwt =require('jsonwebtoken');
require('dotenv').config();

function getData(req,res) {
  task.find({},(err ,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
  // user.findById(req.headers.user).populate('task').then(data=>{
  //   res.send(data.task)
  // }).catch(err=>res.send(err))
}

function insertData(req,res) {
  var newTask = new task({
    task  :req.body.task,
    status:'todo'
  })

  newTask.save((err,data)=>{
    if (!err) {
      jwt.verify(req.headers.token,process.env.SECRET_KEY,(err,decoded)=> {
        user.update({
          _id : decoded._id
        },{
          $push :{
            task :  data._id
          }
        },(err,data)=>{
          if(!err){
            console.log(data)
            res.send(data)
          }else {
            console.log(err)
          }
        })
      })
    }
    else {
      res.status(500).send(err)
    }
  })


}

function updateData(req,res){
  task.update({
    _id : req.params.id
  },{
    $set:{
      task  : req.body.task
    }
  },(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(error)
    }
  })
}

function removeData(req,res) {
  user.findById(req.params.userid)
  .then(dataUser=>{
    console.log();
    user.update({
      _id: req.params.userid
    }, {
      $set: {
        task: dataUser.task.filter(task => {
          return task != req.params.taskid
        })
      }
    })
    .then(respon => res.send(respon))
  })
  .catch(err=>{
    res.send(err)
  })
}
function getOne(req,res){
  task.findById(req.params.id)
  .then(row=>{
    res.send(row)
  })
  .catch(err=>{
    res.send(err)
  })
}
function done(req,res) {
  task.update({
    _id : req.params.id
  },{
    $set:{
      status: 'done'
    }
  },(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(err)
    }
  })
}
module.exports = {getData,insertData,updateData,removeData,getOne,done};
