import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetpassword,
  updateProfileController,
  getOrdersController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object
const router = express.Router();
// routing
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);
router.post("/forgetpassword", forgetpassword);
// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update user profile
router.put("/profile", requireSignIn, updateProfileController);
// orders
router.get("/orders", requireSignIn, getOrdersController);

export default router;
