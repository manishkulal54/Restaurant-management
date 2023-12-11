const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const model=mongoose.model("admin",schema)
module.exports=model