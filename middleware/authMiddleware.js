import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

// protected Routes Token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user && user.role === 1) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorize access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Addmin middleware",
    });
  }
};