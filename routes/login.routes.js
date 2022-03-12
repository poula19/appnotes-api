const app = require('express').Router()
const { findOne } = require('../models/user.model');
const userModel = require('../models/user.model');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



app.post('/login', async(req, res) => {
const{email,password} =req.body
  let user =  await userModel.findOne({email})   
  if(user){
    const match = await bcrypt.compare(password, user.password);
if(match){
let token =  jwt.sign({userID:user._id,role:"user"},'poula')
   res.json({token});
}else{
    
 res.json({message:"false password"});
}
  }else{
     
     res.json({message:"email doesn't exist"});
  }
   
});

module.exports=app