const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password. Please try again!").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // creating salt
    // const salt = await bcrypt.genSalt(10); // asynchronous in nature- that's why using await keyword here
    // let secured_password = await bcrypt.hash(req.body.password, salt)
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }))
    }
    catch (error) {
      console.log(error);
      console.log("fucking spot")
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password. Please try again!").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {

      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try login with correct email address" });
      }
      if (req.body.password !== userData.password) {
        return res
          .status(400)
          .json({ errors: "Try login with correct password" });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;

// router.post("/createuser", async (req,res)=>{

// const { name, email,  password, location} = req.body;

// if(!name || !email || !password || !location){
//     return res.status(422).json({
//        error: "please full-fill all the field",
//     })
// }

// try {
//     const userExist = await User.findOne({ email: email });
//     if (userExist) {
//       return res.status(422).json({ error: "user already exist" });
//     }
//     const user = new User({ name, email,  password, location });

//     const userRegister = await user.save();
//     if (userRegister) {
//       return res.status(201).json({ message: "user Registered successFully" });
//     } else {
//       return res.status(421).json({ error: "some error occurs" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
