const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const {token}=req.body
    jwt.verify(token,'poula',async(err,decoded)=>{
        if (err) {
            res.json({err})
            
        }else{
        req.userID=decoded.userID
                   next()         
        }

    })
}