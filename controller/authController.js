import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken"

const registerController = async (req, res) => {
  try {
    // Get the data
    const { name, email, password, phone, address } = req.body;
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
    // save
    const user = await new userModel({
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

const loginController = async(req,res)=>{
    try{
      const {email,password} = req.body;
      // validation
      if(!email || !password){
        res.status(401).send({
          success:false,
          message:"Invalid username or password",
        })
      }

      const user = await userModel.findOne({email});
      if(!user){
        res.status(404).send({
          success:"false",
          message:"Email Not Register",
        })
      }
      const match = await comparePassword(password , user.password)
      if(!match){
        res.status(200).send({
          success:false,
          message:"Invalid Password  "
        })
      }
      // token
      const token = JWT.sign({_is:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

      res.status(200).send({
        success:true,
        message:"Successfully Login",
        user:{
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.address,
        },
        token,
      })



    }catch(error){
        console.log(error);
        res.status(500).send({
          success:false,
          message:"Login error",
          error,
        })
    }
}

const testController = (req,res)=>{
    
        res.send("Protected Route");        
    
}
export { registerController,loginController ,testController};
