import {Todo} from '../db/db.js'
import {statusCodes} from '../utils/statusCodes.js'

export const createTodo=async (req,res)=>{
    const {todo}=req.body
    const id=req.id

    try {
        //creating todo in db
        const data=await Todo.create({todo,user:id})
        return res.status(statusCodes.OK).json({msg:"todo created", data})
    } catch (error) {
        
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"internal server error"})
    }
}

export const deleteTodo=async (req,res)=>{
    const id=req.params.id
    try {
        if(!id){return res.status(statusCodes.BAD_REQUEST).json({msg:"no post id"})}

        // check if post exists or not
      const del = await Todo.findByIdAndDelete(id)
      
      return res.status(statusCodes.OK).json({msg:"todo deleted"})


    } catch (error) {
        
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"internal server error"})
    }
}
export const updateTodo=async (req,res)=>{
    const {todo,status}=req.body
    const id=req.params.id
    try {
        if(!id){return res.status(statusCodes.BAD_REQUEST).json({msg:"no post id"})}

      const updatedPost=await Todo.findByIdAndUpdate({todo,status})


      return res.status(statusCodes.OK).json({msg:'todo updated', updateTodo})


    } catch (error) {
        
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"internal server error"})
    }
}

export const getAllTodo=async (req,res)=>{
    const id= req.id

    try {
        const todos=await Todo.find({user:id})
        if(todos.length<=0){return res.status(200).json({msg:"no todos to display-please add a todo"})}
        
        return res.status(200).json({msg:"todos", todos})

    } catch (error) {
      
        return res.status(500).json({msg:"internal server error"})
        
    }
}