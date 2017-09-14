var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')
mongoose.connect('mongodb://localhost/todo-list-1', (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});
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
