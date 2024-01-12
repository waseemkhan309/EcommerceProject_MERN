import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
const router = express.Router();

// Routers
// create products
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// update products
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
// get products
router.get("/get-product", getProductController);
// get products by Id
router.get("/get-product/:slug", getSingleProductController);
// get photo
router.get("/get-photo/:pid", productPhotoController);
// delete
router.delete("/deleteproduct/:pid", deleteProductController);

export default router;
