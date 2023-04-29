const jwt=require("jsonwebtoken");
require("dotenv").config();
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization;
    try {
        if(token){
            const decode=jwt.verify(token,process.env.key);
            if(decode){
                req.body.userId=decode.userId;
                next();
            }else{
                res.json({"msg":"login again"})
            }
        }
    } catch (error) {
        console.log("error from authentication",error)
        res.json({"msg":"error for authentication middleware"})
    }
}

module.exports={
    authenticate
}