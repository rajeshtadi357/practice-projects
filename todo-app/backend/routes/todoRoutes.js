import express  from 'express'
import { statusCodes } from '../utils/statusCodes.js'
import { protected_route } from '../middlewares/protectedRoute.js'
import { createTodo , deleteTodo, getAllTodo, updateTodo} from '../controllers/todoController.js'
import { Todo } from '../db/db.js'

const router= express.Router()


router.get('/get/:id', protected_route, async(req,res)=>{
    const id=req.params.id
   
    try {
        if(!id){return res.status(statusCodes.BAD_REQUEST).json({msg:"no post id"})}

        const todo=await Todo.findById(id)
        return res.status(statusCodes.OK).json({msg:"your todo", todo})
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"you are an authenticated user"})
    }
   
    
})
router.get('/bulk', protected_route,getAllTodo)


router.post('/create',protected_route,createTodo)
router.delete('/delete/:id',protected_route,deleteTodo)
router.put('/update/:id',protected_route,updateTodo)

export default router