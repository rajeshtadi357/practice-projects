import express from 'express'
import { configDotenv } from 'dotenv'
import userRouter from './routes/userRoutes.js'
import todoRouter from  './routes/todoRoutes.js'
import cors from 'cors'
configDotenv()


const app=express()

// getting the env variables
const port=process.env.PORT || 5000
 
// implementing middlewares 
app.use(cors())
app.use(express.json())     // for parsing json bodies


app.get('/', (req,res)=>{
    res.json({msg:"hello , im practicing to build the backend server"})
})




// last routing middleware
app.use('/user', userRouter)
app.use('/todo', todoRouter)

app.listen(port, ()=>console.log("your server is running on port 3000"))