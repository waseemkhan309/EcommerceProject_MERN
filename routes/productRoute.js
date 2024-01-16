import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListController,
  productCategoryController,
  searchProductController,
  braintreeTokenController,
  braintreePaymentController,
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
// product filter
router.post("/product-filters", filterProductController);
// product count
router.get("/product-count", productCountController);
// product per page
router.get("/product-list/:page", productListController);
// product search
router.get("/searchproduct/:keyword", searchProductController);
// category wise product get
router.get("/product-category/:slug", productCategoryController);
// payment route  ~~ token
router.get("/brainetree/token", braintreeTokenController);
// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
