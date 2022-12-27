const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Register user
//@route  POST  api/users
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check all fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all Fields");
  }

  //check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create The User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //check if user was created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name,
      email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

//@desc   Authenticate the user
//@route  POST  api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check all fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all Fields");
  }

  //check if user exist
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Login successful",
      data: {
        _id: user.id,
        name: user.name,
        email,
        token: generateToken(user.id),
      },
    });
  } else {
    res.status(400);
    throw new Error("invalid Credentials");
  }

  res.status(200).json({
    message: "Login users",
  });
});

//@desc   GET USER DATA
//@route  GET  api/users/ME
//@access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "get users",
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
