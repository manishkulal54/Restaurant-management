const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    description:{
        required:true,
        type:String
    },
    foodType:{
        required:true,
        type:mongoose.Schema.Types.Mixed,
        default:{}
    },
    price:{
        required:true,
        type:Number
    },
    image:{
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const model=mongoose.model("food",schema)
module.exports=model