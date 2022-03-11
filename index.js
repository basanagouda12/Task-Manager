const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://basu12:basu12@cluster0-auzs2.mongodb.net/taskManager?retryWrites=true&w=majority'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

const alienRouter = require('./routes/task')
app.use('/tasks',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})