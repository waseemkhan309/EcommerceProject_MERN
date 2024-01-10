import express from "express";
import {createProductController} from '../controller/productController.js'
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

// Routers
// create products
router.post('/create-product',requireSignIn,isAdmin,createProductController);

export default router