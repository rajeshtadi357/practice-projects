import express from 'express'
import { signup,login,userInfo } from '../controllers/userController.js'
import { protected_route } from '../middlewares/protectedRoute.js'

const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/user', protected_route,userInfo)


export default router