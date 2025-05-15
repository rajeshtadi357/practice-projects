import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userSchema from "./userSchema.js"
import todoSchema from "./todoSchema.js"



configDotenv()

const url=process.env.DB_URL

try {
    mongoose.connect(url)
    console.log("your db is connected")
} catch (error) {
    console.log(error)
}

const User=mongoose.model('User', userSchema)
const Todo=mongoose.model('todo', todoSchema)

export {User, Todo}



