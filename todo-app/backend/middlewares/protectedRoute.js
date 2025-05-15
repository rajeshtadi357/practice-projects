import jwt from 'jsonwebtoken'
import { statusCodes } from "../utils/statusCodes.js"


export const protected_route=(req,res,next)=>{
    const token=req.headers.authorization
    
    try {
        if(!token){return res.status(statusCodes.UNAUTHORIZED).json({msg:"unauthenticated user"})}

        // if token exits proceed with verifing
        const jwt_token =token.split(' ')[1]
       
        const decoded=jwt.verify(jwt_token,process.env.JWT_SECRET)
        
        
        req.id=decoded.id
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.UNAUTHORIZED).json({msg:"token expired/invalid token"})
        
        
    }
}