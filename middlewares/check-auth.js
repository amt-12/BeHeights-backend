const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCESS_TOKEN_SECRET;

module.exports=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const verify = jwt.verify(token, secretKey);
        console.log(secretKey)
                next();
    }
    catch(error){
        return res.status(401).json({
            message:"Invalid Token !!"
        })
    }
}