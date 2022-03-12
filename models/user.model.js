const mongoose=require('mongoose')

const useSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String
})
module.exports = mongoose.model('user',useSchema)