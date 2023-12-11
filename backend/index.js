const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const mongoose=require("mongoose")


const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MongoDB connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


dotenv.config()
const app=express()
const port=process.env.PORT

// require("./database")
app.use(express.json())
app.use(cors())

app.use('/api/user',require("./Routes/users"))
app.use('/api/food',require("./Routes/food"))
app.use('/api/order',require("./Routes/order"))
app.use('/api/admin',require("./Routes/admin"))


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`connected at http://localhost:${port}`);
    })
})
