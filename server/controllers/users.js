const user = require('../models/users')
const encryptPassword = require('../helper/encryptPassword')
const newKey = require('../helper/key')
var jwt = require('jsonwebtoken');
require('dotenv').config()

function getData(req,res) {

  user.find().populate('task').then(data=>res.send(data)).catch(err=>res.send(err))
}

function insertData(req,res) {
  var makeKey = newKey()
  console.log(makeKey);
  console.log(req.body.password);
  var newUser = new user({
    username  :req.body.username,
    email :req.body.email,
    password : encryptPassword(req.body.password,makeKey),
    key: makeKey,
    role: 'user'
  })

  newUser.save((err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
}

function updateData(req,res){
  var makeKey = newKey()
  user.update({
    _id : req.params.id
  }, {
    username  :req.body.username,
    email :req.body.email,
    password : encryptPassword(req.body.password,makeKey),
    key: makeKey,
  }, (err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(error)
    }
  })
}

function removeData(req,res) {
  user.remove({_id:req.params.id},(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(err)
    }
  })
}
function getOne(req,res){
  user.findById(req.params.id).populate('task')
  .then(row=>{
    res.send(row)
  })
  .catch(err=>{
    res.send(err)
  })
}
function signin(req,res){
  console.log(req.body.username);
  user.findOne({username: req.body.username})
  .then(data=>{
    console.log('masuk data',data);
    if (data.password == encryptPassword(req.body.password,data.key)) {
      var token = jwt.sign({
        _id :data._id,
        username : data.username
      },process.env.SECRET_KEY);
      res.send(token)
    }else {
      res.send('password salah')
    }
  })
  .catch(err=> res.send('You Must Register First'))
}
module.exports = {getData,insertData,updateData,removeData,getOne,signin};
