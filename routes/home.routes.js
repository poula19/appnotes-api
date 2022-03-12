

const app = require('express').Router()
const  auth  = require('../middleware/auth');
const noteModel=require('../models/notes.model')
const jwt=require('jsonwebtoken');
const req = require('express/lib/request');

app.get('/home',async(req, res) => {
  let Page_Number=req.query.page
  let Page_Limit=5
if (Page_Number==undefined||Page_Number<=0) {
  Page_Number=1
}else{
  Page_Number=req.query.page
}
  let Skip=(Page_Number-1)*Page_Limit
  //let total=await await noteModel.find().count()
  let notes=await noteModel.find().sort({key:-1}) .skip(Skip).limit(Page_Limit)
  res.json({ page:Page_Number,notes}); 
 //  let userID=req.header('userID')
 //  let token=req.header('token')
 //  jwt.verify(token,'poula',async(err,decoded)=>{
  //  if (err) {
    //    res.json({err})
      //   }else{
   //   console.log(decoded);
     //   let notes=await noteModel.find({userID})
      //  res.json(notes);
      //  }
//})
 })

app.post('/addNote',auth, async(req, res) => {
    const{title,desc}=req.body
      try {
        await noteModel.insertMany({userID:req.userID, title,desc})
        res.json({message:"success"})

      } catch (error) {
           res.json({error});
      }
});
app.delete('/delete', async(req, res) => {
 console.log(req.body);
 const {_id}=req.body
 await noteModel.findByIdAndDelete({_id}) 
   res.json({message:"deleted"});
});

app.put('/editNote',auth,async(req, res) => {
    
    const{_id,title,desc}=req.body
    await noteModel.findByIdAndUpdate({_id},{title,desc})
     res.json({message:"updated"});
});





module.exports=app