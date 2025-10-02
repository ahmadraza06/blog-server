import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
export const authenticateToken = async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const Token = authHeader && authHeader.split(' ')[1];

    if(Token == null){
        return res.status(401).json({msg:"token is missing"})
    }
    jwt.verify(Token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
        if(error){
            return res.status(402).json({msg:"Invalid Token"})

        }
        req.user = user;
        next()
    })

}