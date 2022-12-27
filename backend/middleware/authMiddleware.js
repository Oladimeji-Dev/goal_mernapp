const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.header.authorization &&
    req.header.authorization.startWith("Bearer")
  ) {
    try {
      let token;
      //Split it from the word Bearer and token which is the name
      token = req.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");


      next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not authorized")
    }
  }

  if(!token){
    res.status(400)
    throw new Error("Not authorized No token ")
  }
});


module.exports = {protect}
