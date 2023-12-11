const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    phone:{
        required:true,
        type:Number
    },
    email:{
        required:true,
        type:String,
        unique:true
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

const model=mongoose.model("users",schema)
module.exports=model