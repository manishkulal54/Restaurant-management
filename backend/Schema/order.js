const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    tableNo:{
        type:String,
        required:true
    },
    foodName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    delivered:{
        type:Boolean,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})
const model=mongoose.model("order",schema)
module.exports=model