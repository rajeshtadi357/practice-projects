import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
    }
    
}, {timestamps:true})

export default todoSchema
