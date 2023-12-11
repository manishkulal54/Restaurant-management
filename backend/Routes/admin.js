const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs")

const Admin =require('../Schema/admin')
const verifyAdmin=require('../middlewares/admin')

const router=express.Router()
const secretkey=process.env.SECRET_KEY


router.post('/create',verifyAdmin,async(req,res)=>{
    try {
        let admin=await Admin.findOne({name:req.body.name})
        if(admin)  return res.status(409).json({ status: "error", message: "admin already there" })

        const hashedpass= await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

        admin=await Admin.create({
            name:req.body.name,
            password:hashedpass
        })

        const token = jwt.sign({id:admin._id},secretkey)
        return res.status(201).json({ status: "success", message: token,admin})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})


router.post("/login", async (req, res) => {
    const { name, password } = req.body
    try {
        let admin =await Admin.findOne({ name })
        if (!admin) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        if (!await bcrypt.compare(password,admin.password)) return res.status(401).json({ status: "error", message: "Invalid Credential" })
        const token = jwt.sign({ id: admin._id }, secretkey)
        return res.status(200).json({ status: "success", message: token })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})


router.get("/getalladmin", verifyAdmin,async (req, res) => {
    try {
        let admins =await Admin.find({ }).select("-password -date")
        return res.status(200).json({ status: "success", message: admins })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.delete("/delete/:id",verifyAdmin,async (req, res) => {
    const id=req.params.id
    try {
        let admin =await Admin.findById(id)
        if (!admin) return res.status(400).json({ status: "error", message: "admin not found" })
        await Admin.findByIdAndDelete(id)
        return res.status(200).json({ status: "success", message: "Account Deleted" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})




module.exports=router