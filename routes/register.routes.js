const app = require('express').Router()
const{validationResult} =require('express-validator')
const validation =require('../validation/register.validation')
const userModel=require('../models/user.model');
const { find } = require('../validation/register.validation')
const bcrypt = require('bcrypt');

app.post('/SignUp', validation,async(req, res) => {

const {name,email,password,confirmPassword} = req.body
    const errors=  validationResult(req)
if(errors.isEmpty()){
 let user= await userModel.findOne({email})
 if(user){
      res.json({message:"email exists"});
 }else{
    bcrypt.hash(password, 7,async function(err, hash) {
        await   userModel.insertMany({name,email,password:hash})
     res.json({message:"Success"});
    });
   
 }
  
  }else{
    req.json({'errors':errors.array()})
  }j
});
module.exports = app