const jwt=require("jsonwebtoken")

module.exports=async function verifyUser(req,res,next){
    try {
        const id=req.header("auth-token")
        if(!id) return res.status(200).json({status:"error",message:"Invalid user authenticate first"})
        const data = jwt.verify(id,process.env.SECRET_KEY)
        req.userId=data.id
        next()
    } catch (error) {
        res
        .status(500)
        .json({ message: "error", error: "Sorry invalid user authenticate first" });
    }
}