const express = require("express")
const Order = require("../Schema/order")
const verifyUser = require("../middlewares/user")
const verifyAdmin=require("../middlewares/admin")
const router = express.Router()

router.post("/create", verifyUser, async (req, res) => {
    const userId = req.userId
    const { foodName,price, tableNo, quantity,image } = req.body
    try {
        const order = await Order.create({
            userId, foodName,price,image,tableNo, quantity, delivered: false
        })
        if (!order) return res.status(400).json({ status: "error", message: "Failed to create order" })
        return res.status(201).json({ status: "success", message: order })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.get("/getallorders", verifyAdmin,async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders) return res.status(400).json({ status: "error", message: "Failed to create order" });
        return res.status(200).json({ status: "success", message: orders });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})


router.get("/getallordersofuser", verifyUser, async (req, res) => {
    const userId = req.userId
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    try {
        const orders = await Order.find({
            userId: userId,  // replace 'yourUserId' with the actual user ID
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        if (!orders) {
            return res.status(400).json({ status: "error", message: "Failed to create order" });
        }
        return res.status(200).json({ status: "success", message: orders });
    } catch (error) {
                return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

router.post('/update/:id',async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findByIdAndUpdate(orderId, req.body)
        if (!order) return res.status(400).json({ status: "error", message: "Order not found with this ID" })
        return res.status(200).json({ status: "success", message: "updated successfully" })
} catch (error) {
    return res.status(500).json({ status: "error", message: "Internal server error" })
}
})

router.delete('/delete/:id', async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findByIdAndDelete(orderId)
        if (!order) return res.status(400).json({ status: "error", message: "Order not found with this ID" })

        return res.status(200).json({ status: "success", message: "deleted successfully" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})


router.post('/gettodayorder',async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        const todayOrders = await Order.find({
            date: {
                $gte: startOfDay,
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
            }
        })
        return res.status(200).json({ status: "success", message: todayOrders });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


router.get('/getearnings', verifyAdmin,async (req, res) => {
    let count = 0
    try {
        const orders = await Order.find({});
        if (!orders) return res.status(400).json({ status: "error", message: "Failed to create order" });
        orders.forEach(order => {
            if (order.delivered) {
                count = count + (order.quantity * order.price)
            }
        })
        res.status(200).json({ status: "success", message: count })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
})

router.get("/foodOrderCount",async(req,res)=>{
    try {
        const dict={}
        const orders=await Order.find({})
        orders.forEach(({foodName})=>{
            if (foodName in dict){
                dict[foodName]=dict[foodName]+1
            }else{
                dict[foodName]=1
            }
        })
        res.status(200).json(dict)
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})

module.exports = router
