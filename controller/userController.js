import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import token from "../models/tokensmodel.js";

dotenv.config()

export const signUp = async(req,res)=>{
    try{
        const body = req.body;
        const hashpassword =await bcrypt.hash(req.body.password,10) 
        const user = new User({name:body.name,username:body.username,password:hashpassword});
        await user.save()

        return res.status(200).json({message:"Sign Up successfully done"})
    }
    catch(err){
        return res.status(500).json({message : "Error while signup the user "})
    }
  
}

//login
export const login = async(req,res)=>{
    
    try{
        let user = await User.findOne({username:req.body.username})
        if(user){
            try{
                let match = await bcrypt.compare(req.body.password,user.password)
                if(!match){
                    res.status(402).json({msg:"password does not match"});
                }
                const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
                const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY)
                
                const newToken = new token({token:refreshToken})
                await newToken.save();

                res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})
            }
            catch{
                res.status(403).json({msg:"Error in Token generating"})
            }
            
            
        }
        else{
            res.status(401).json({msg:"user not found. try again"})
        }
    }
    catch{
        return res.status(400).json({msg:"Error  . try again"})
    }
    
}
// upload image

