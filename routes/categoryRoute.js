import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singlecategoryController,
  deleteCategory
} from "../controller/categoryController.js";
const router = express.Router();

// Routes
// create category || POST
 router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category || PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// getAll category || GET
router.get("/get-category", categoryController);
// get single category || GET
router.get("/single-category/:slug", singlecategoryController);
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategory)

export default router;
