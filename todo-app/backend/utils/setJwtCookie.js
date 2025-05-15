import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()

export const createJwt=(id)=>{
     
    try {
        const token=jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'1d'})
        return token
    } catch (error) {
        throw error
    }
    
}
