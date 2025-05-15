import bcrypt from 'bcryptjs'
import {userSignup,userLogin} from '../utils/types.js'
import { statusCodes } from '../utils/statusCodes.js'
import {User } from "../db/db.js"
import { configDotenv } from 'dotenv'
import { createJwt } from '../utils/setJwtCookie.js'

configDotenv()



export const signup=async (req,res)=>{
    const {name,email, password}=req.body

    try {
        
        const {success}= userSignup.safeParse({name,email,password})
        
        if(!success){return res.status(statusCodes.BAD_REQUEST).json({msg:"invalid inputs"})}
 
        // if input validation is success then hash the password
        const hashedPassword=await bcrypt.hash(password,10)
       

        // after hashing save to db
        // first check if user with this email exist or not
        const existing_user=await User.findOne({email})
        if(existing_user){return res.status(statusCodes.BAD_REQUEST).json({msg:"email already exist"})}


        const user=await User.create({name,email,password:hashedPassword})
        return res.status(statusCodes.OK).json({msg:"user account created", id:user._id})
        
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"internal server error"})
       
    }

}

export const login=async (req,res)=>{
    const {email,password}=req.body

    try {
        // input validation
        const {success}= userLogin.safeParse({email,password})
        if(!success){return res.status(statusCodes.BAD_REQUEST).json({msg:"invalid inputs"})}

        // now check if entered details are correct
        // first chcek if user exists or not
        const user=await User.findOne({email})
      
        if(!user){return res.status(statusCodes.BAD_REQUEST).json({msg:"no user found"})}

        // then compare password
        const result=await bcrypt.compare(password,user.password)
        if(!result){return res.status(statusCodes.BAD_REQUEST).json({msg:"invalid password"})}

        // if everything is oky then create jwt token
        const token=createJwt(user._id)

        return res.status(statusCodes.OK).json({msg:"user logged in successfully", token})
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"insternal server error"})
        
    }
}


export const userInfo=async (req,res)=>{
    const id =req.id

    try {
         if(!id){return res.status(statusCodes.BAD_REQUEST).json({msg:"no user id"})}

        //get user details
        const user=await User.findOne({_id:id}).select('-password')




        return res.status(statusCodes.OK).json({msg:"user details", user})

    } catch (error) {
        
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"internal server error"})
    }
}