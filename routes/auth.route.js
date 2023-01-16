const { Router } = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const UserRouter = Router();
require("dotenv").config();

UserRouter.post("/signup", async (req, res) => {
  const { email, password, name, gender } = req.body;

  const isprsent = await UserModel.findOne({ email });
  if (isprsent) {
    res.send({ msg: "User Already Exist of This Email" });
  } else {
    try {
      bcrypt.hash(password, 4, async function (err, hashedpassword) {
        const newUser = new UserModel({
          email,
          password: hashedpassword,
          name,
          gender,
        });
        await newUser.save();
        if (!err) {
          res.send({ msg: "User Signup Successfully" });
        } else {
          res.send({ msg: "Something Wents Wrong", error: err });
        }
      });
    } catch (err) {
      res.send("something Wents Wrong in Hashed Password");
    }
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isUserSignup = await UserModel.findOne({ email });
  if (!isUserSignup) {
    res.send({ msg: "User Not exist Please Signup" });
  } else {
    userID = isUserSignup._id;
    console.log("user", userID);
    const hashedpassword = isUserSignup.password;

    bcrypt.compare(password, hashedpassword).then(function (result) {
      if (result) {
        var token = jwt.sign({ userID: userID }, process.env.SECRET_KEY);

        res.send({ msg: "Login Sucess", token: token });
      } else {
        res.send({ msg: "Login Faild please Try Again" });
      }
    });
  }
});

module.exports = { UserRouter };
