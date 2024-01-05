import express from "express";
import {registerController,loginController,testController} from '../controller/authController.js' 
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
// router object
const router = express.Router();
// routing
router.post('/register' , registerController)
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,testController)
// protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ ok:true });
})


export default router;