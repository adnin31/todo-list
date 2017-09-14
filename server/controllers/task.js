const task = require('../models/task.js')
const user = require('../models/users.js')

function getData(req,res) {
  // task.find({},(err ,data)=>{
  //   if(!err){
  //     res.send(data)
  //   }else {
  //     res.status(500).send(err)
  //   }
  // })
  user.findById(req.headers.user).populate('task').then(data=>{
    res.send(data.task)
  }).catch(err=>res.send(err))
}

function insertData(req,res) {
  var newTask = new task({
    task  :req.body.task,
    dueDate :req.body.date,
  })

  newTask.save((err,data)=>{
    if(!err){
      user.update({
        _id :req.headers.user
      },{
        $push :{
          task :  data._id
        }
      },(err,data)=>{
        if(!err){
          console.log();(data)
        }else {
          console.log();(error)
        }
      })
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })


}

function updateData(req,res){
  task.update({
    _id : req.params.id
  },{
    task  :req.body.task,
    dueDate :req.body.date,
  },(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(error)
    }
  })
}

function removeData(req,res) {
  task.remove({_id:req.params.id},(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(err)
    }
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
module.exports = {getData,insertData,updateData,removeData,getOne};
