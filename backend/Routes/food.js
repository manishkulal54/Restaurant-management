const express = require("express")

const router = express.Router()
const Food = require("../Schema/food")
const verifyAdmin=require("../middlewares/admin")


router.post("/create",verifyAdmin,async(req, res) => {
    const { name, description, foodType1, foodType2, price,img } = req.body
    try {
        let food = await Food.findOne({ name })
        if (food) return res.status(409).json({ status: "error", message: "Food already found" })

        food = await Food.create({
            name,
            description,
            foodType: {"diet":foodType1,"temperature":foodType2},
            price,
            image: img
        })
        return res.status(200).json({ status: "success", message: food })

    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.get("/getfood/:id", async (req, res) => {
    try {
        let food = await Food.findById(req.params.id)
        if (!food) return res.status(400).json({ status: "error", message: "Food Not found" })

        return res.status(200).json({ status: "success", message: food })

    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.get("/getallfoods",async (req, res) => {
    try {
        let foods = await Food.find({})
        if (!foods) return res.status(400).json({ status: "success", message: [] })
        
        return res.status(200).json({ status: "success", message: foods })   
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.post('/update/:id', verifyAdmin,async (req, res) => {
    try {
        let foods = await Food.findById(req.params.id)
        if (!foods) return res.status(400).json({ status: "error", message: "Food not found" })
        foods = await Food.findByIdAndUpdate(req.params.id, req.body,{new:true})
        return res.status(200).json({ status: "success", message: foods })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.delete('/delete/:id',verifyAdmin,async (req, res) => {
    try {
        let foods = await Food.findById( req.params.id)
        if (!foods) return res.status(400).json({ status: "error", message: "Food not found" })
        foods = await Food.findByIdAndDelete(req.params.id)
        return res.status(200).json({ status: "success", message: "deleted successfully" })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

module.exports = router