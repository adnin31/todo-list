var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')
mongoose.connect('mongodb://adnin31:enggakadapasswordnya@ecommerce-shard-00-00-pmhx7.mongodb.net:27017,ecommerce-shard-00-01-pmhx7.mongodb.net:27017,ecommerce-shard-00-02-pmhx7.mongodb.net:27017/todo?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var task = require('./routers/task.js')
app.use('/task',task)

var user = require('./routers/user')
app.use('/user',user)

app.get('/',(req,res)=>{
    res.send('yuhuuu')
})


app.listen(3000)
