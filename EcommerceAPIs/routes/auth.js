const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

// Register
router.post("/register", async (req, res) => {
  const user = await User.findOne({email:req.body.email});
  if (user){
    return res.status(409).json('this user already exists');
  }
  // create newUser
  const newUser = new User({
    // extract user data from the body
    name: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    // save new user in DB
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      const error = new Error("Wrong credentials!");
      error.statusCode = 401;
      throw error;
    } 

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if(originalPassword != req.body.password ){
      const error = new Error("Wrong credentials!.");
      error.statusCode = 401;
      throw error;
    }
    
    // separate password from user information
    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc; // because mongoDB stores documents inside _doc folder

    res.status(200).json({...others, accessToken});
    

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
