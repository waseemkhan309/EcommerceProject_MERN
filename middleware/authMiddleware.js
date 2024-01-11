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
}

// addmin access
export const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.user._is)
    const user = await userModel.findById(req.user._is);
    // console.log(user)
    // const user = await userModel.findById(req.user._id);
    // if (user && user.role !== 1) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "UnAuthorize Access",
    //   });
    // } else {
    //   next();
    // }
    // console.log(user)
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
