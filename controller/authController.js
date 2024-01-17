import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    // Get the data
    const { name, email, password, phone, address, answere } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name is Requied" });
    }
    if (!email) {
      return res.send({ message: "Email is Requied" });
    }
    if (!password) {
      return res.send({ message: "Password is Requied" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Requied" });
    }
    if (!address) {
      return res.send({ message: "Address is Requied" });
    }
    if (!answere) {
      return res.send({ message: "Answere is Requied" });
    }
    // userExisting
    // const checkEmail = req.body.email;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email register please login",
      });
    }
    // Hashing password
    const hashedPassword = await hashPassword(password);
    // save in database
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answere,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
// login || POST
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: "false",
        message: "Email Not Register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "Invalid Password  ",
      });
    }
    // token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Successfully Login",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login error",
      error,
    });
  }
};
// || GET
const testController = (req, res) => {
  res.send("Protected Route");
};
// forget password || POST
const forgetpassword = async (req, res) => {
  try {
    // Get the data
    const { email, newpassword, answere } = req.body;
    // validation
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!newpassword) {
      return res.send({ message: "newpassword is required" });
    }
    if (!answere) {
      return res.send({ message: "answere is required" });
    }
    // userExisting
    // const checkEmail = req.body.email;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email not register please register",
      });
    }
    // Hashing password
    const hashed = await hashPassword(newpassword);
    // save
    if (answere === existingUser.answere) {
      await userModel.findByIdAndUpdate(existingUser._id, { password: hashed });
      res.status(201).send({
        success: true,
        message: "Password Forget  Successfully",
        existingUser,
      });
    } else {
      return res.send({
        message: "anwere is Wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// update profile
const updateProfileController = async (req, res) => {
  try {
    const { email, name, password, phone, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await userModel.findById(req.user._id);
    // password
    if (password && password.length > 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashpassword = password ? await hashPassword(password) : undefined;
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashpassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updateUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error in Profile Update",
      err,
    });
  }
};

// order || get Method
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyers: req.user._id })
      .populate("products", "-photo")
      .populate("buyers", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Order controller auth",
      err,
    });
  }
};

export {
  registerController,
  loginController,
  testController,
  forgetpassword,
  updateProfileController,
  getOrdersController,
};
