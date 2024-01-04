import userModel from "../model/userModel.js";
import { hashPassword } from "../utils/authUtils.js";

const registerController = async (req, res) => {
  try {
    // Get the data
    const { name, email, password, phone, address } = req.body;
    // validation
    if (!name) {
      return res.send({ error: "Name is Requied" });
    }
    if (!email) {
      return res.send({ error: "Email is Requied" });
    }
    if (!password) {
      return res.send({ error: "Password is Requied" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Requied" });
    }
    if (!address) {
      return res.send({ error: "Address is Requied" });
    }
    // userExisting
    // const checkEmail = req.body.email;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Email register please login",
      });
    }
    // Hashing password
    const hashedPassword = await hashPassword(password);
    // save
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
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
export { registerController };
