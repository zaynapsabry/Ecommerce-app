const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// Register
router.post("/register", async (req, res) => {
  // create newUser
  const newUser = new User({
    // extract user data from the body
    username: req.body.username,
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
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword != req.body.password &&
     res.status(401).json("Wrong credentials!");
    // separate password from user information
    const { password, ...others } = user._doc; // because mongoDB stores documents inside _doc folder

    res.status(200).json(others);
    

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
