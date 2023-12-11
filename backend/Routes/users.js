const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const User = require('../Schema/user')
const Staff = require("../Schema/staff")

const verifyAdmin=require("../middlewares/admin")

const router = express.Router()
const secretkey = process.env.SECRET_KEY


router.post("/createuser", async (req, res) => {
    const { name, phone, email, password } = req.body
    try {
        let user =await User.findOne({ email })
        if (user) return res.status(409).json({ status: "error", message: "User with this email address already found" })
        const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10))

        user =await User.create({
            name,
            phone,
            email,
            password: hashPass,
        })

        const token = jwt.sign({ id: user._id }, secretkey) 
        return res.status(201).json({ status: "success", message: token ,user})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.post("/loginuser", async (req, res) => {
    const { email, password } = req.body
    try {
        let user =await User.findOne({ email })
        if (!user) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        if (!await bcrypt.compare(password,user.password)) return res.status(401).json({ status: "error", message: "Invalid Credential" })
        const token = jwt.sign({ id: user._id }, secretkey)
        return res.status(200).json({ status: "success", message: token })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.get('/fetchalluser',verifyAdmin,async(req,res)=>{
    try {
        let users =await User.find({ }).select("-password")
        return res.status(200).json({ status: "success", message: users})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.delete('/deleteuser/:id',verifyAdmin,async(req,res)=>{
    let id=req.params.id
    try {
        let user=await User.findByIdAndDelete(id)
        if(!user) return res.status(400).json({ status: "error", message:"User not found"})
        return res.status(200).json({ status: "success", message:"deleted successfully"})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})




router.post("/createstaff", async (req, res) => {
    const { name, phone, email, password, managerEmail, managerPass } = req.body
    try {
        let staff =await Staff.findOne({ email })
        if (staff) return res.status(409).json({ status: "error", message: "Staff with this email address already found" })

        let manager =await Staff.findOne({ email:managerEmail })
        if (!manager) return res.status(400).json({ status: "error", message: "Invalid manager credential" })
        if (!await bcrypt.compare( managerPass,manager.password)) return res.status(401).json({ status: "error", message: "Invalid manager credential" })

        const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10))
        staff =await Staff.create({
            name,
            phone,
            email,
            password:hashPass,
            managerId: manager._id,
            type:"staff"
        })
        return res.status(201).json({ status: "success", message: "Staff account created",staff })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.post("/loginstaff", async (req, res) => {
    const { email, password } = req.body
    try {
        let staff =await Staff.findOne({ email })
        if (!staff) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        if (!(await bcrypt.compare(password,staff.password))) return res.status(401).json({ status: "error", message: "Invalid Credential" })

        return res.status(200).json({ status: "success", message: "Login Successfull" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.post("/createmanager", async (req, res) => {
    const { name, phone, email, password, managerEmail, managerPass } = req.body
    try {
        let newManager =await Staff.findOne({ email })
        if (newManager) return res.status(409).json({ status: "error", message: "Staff with this email address already found" })

        let manager =await Staff.findOne({ email:managerEmail })
        if (!manager) return res.status(400).json({ status: "error", message: "Invalid manager credential" })

        if (!(await bcrypt.compare( managerPass,manager.password))) return res.status(401).json({ status: "error", message: "Invalid manager credential" })

        const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10))
        newManager =await Staff.create({
            name,
            phone,
            email,
            password:hashPass,
            managerId: manager._id,
            type:"manager"
        })
        return res.status(201).json({ status: "success", message: "Manager account created",manager })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.post("/loginmanager", async (req, res) => {
    const { email, password } = req.body
    try {
        let manager =await Staff.findOne({ email })
        if (!manager) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        if (!(await bcrypt.compare(password,manager.password))) return res.status(401).json({ status: "error", message: "Invalid Credential" })

        return res.status(200).json({ status: "success", message: "Login Successfull" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})



router.get('/fetchallstaffs',verifyAdmin,async(req,res)=>{
    try {
        let staffs =await Staff.find({}).select("-password")
        return res.status(200).json({ status: "success", message: staffs})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.delete('/deletestaff/:id',verifyAdmin,async(req,res)=>{
    let id=req.params.id
    try {
        let user=await Staff.findByIdAndDelete(id)
        if(!user) return res.status(400).json({ status: "error", message:"User not found"})
        return res.status(200).json({ status: "success", message:"deleted successfully"})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.get('/getstaffcount',verifyAdmin,async(req,res)=>{
    try {
        let count=await Staff.countDocuments({type:"staff"})
        return res.status(200).json({ status: "success", count})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.get('/getmanagercount',verifyAdmin,async(req,res)=>{
    try {
        let count=await Staff.countDocuments({type:"manager"})
        return res.status(200).json({ status: "success", count})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})




module.exports = router