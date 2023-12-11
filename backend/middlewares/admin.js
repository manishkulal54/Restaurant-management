const jwt=require("jsonwebtoken")

module.exports=async function verifyAdmin(req,res,next){
    try {
        const id=req.header("admin-token")
        if(!id) return res.status(200).json({status:"error",message:"Invalid admin. Authenticate first"})
        const data = jwt.verify(id,process.env.SECRET_KEY)
        req.adminId=data.id
        next()
    } catch (error) {
        res
        .status(500)
        .json({ message: "error", error: "Sorry invalid user authenticate first" });
    }
}