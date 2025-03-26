const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")
const jwt = require("jsonwebtoken");
const secret = "secret";

const login = async(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      })
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);

    await mailUtil.sendingMail(createdUser.email, "Welcome to the My Parking area", "This is Welcome mail")
    
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};
const addUser1  = async(req,res)=>{

  
  try{

      const createdUser = await userModel.create(req.body)
      res.status(201).json({
          message:"user created..",
          data:createdUser
      })



  }catch(err){

      res.status(500).json({
          message:"error",
          data:err
      })

  }
}
const getAllUsers = async (req,res) => {

    const users = await userModel.find().populate("roleId");

    res.json({
    message: "user fetched successfully",
    data:users
    });
};

const addUsers = async(req,res) => {
const savedUsers = await userModel.create(req.body)

res.json({
  message: "user created...",
  data:savedUsers

});
};

const deleteUsers = async(req,res) => {


  const deletedUsers = await userModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "user deleted successfully...",
    data:deletedUsers
  
  })
}
const getUsersById = async (req,res)=>{

  

  const foundUsers = await userModel.findById(req.params.id)
  res.json({
    message:"user fatched..",
    data:foundUsers
  })

}
const forgotPassword =async (req,res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
    <a href ="${url}">rest password</a>
    </html>`;
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};
const resetpassword = async (req, res) => {
  const token = req.body.token; 
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPassword,
  });
  res.json({
    message: "password updated successfully..",
  });
};
  

module.exports = {
    getAllUsers,addUsers,deleteUsers,getUsersById,addUser1,signup,login,forgotPassword,resetpassword
};