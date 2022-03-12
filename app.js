const express = require('express');
const app = express()
const port = 3000
const path = require('path')
const cors=require('cors')


const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.get('*',(req,res)=>{
  res.send("404 page note found")
})

mongoose.connect('mongodb+srv://poulasobhy18:poulas186@cluster1.rjtgf.mongodb.net/project1').then(()=>{})
app.listen(process.env.PORT || port, () => { console.log(`Server started on port`)});