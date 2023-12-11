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
    },
    password:{
        required:true,
        type:String
    },
    managerId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const model=mongoose.model("staff",schema)
module.exports=model