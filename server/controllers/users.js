const user = require('../models/users')
const encryptPassword = require('../helper/encryptPassword')
const newKey = require('../helper/key')

function getData(req,res) {

  user.find().populate('task').then(data=>res.send(data)).catch(err=>res.send(err))
}

function insertData(req,res) {
  var makeKey = newKey()
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
  },{
    username  :req.body.username,
    email :req.body.email,
    password : encryptPassword(req.body.password,makeKey),
    key: makeKey,
  },(err,data)=>{
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
  user.findById(req.params.id)
  .then(row=>{
    res.send(row)
  })
  .catch(err=>{
    res.send(err)
  })
}
function signin(req,res){
  user.find({username: req.body.username}).
  then(data=>{
    if (data[0].password == encryptPassword(req.body.password,data[0].key)) {
      var token = jwt.sign({
        _id :data[0]._id,
        username : data[0].username,
        role : data[0].role
      },process.env.SECRET_KEY);
      res.send(token)
    }else {
      res.send('password salah')
    }
  })
  .catch(err=> res.send('You Must Register First'))
}
module.exports = {getData,insertData,updateData,removeData,getOne};
