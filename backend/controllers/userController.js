//@desc   Register user
//@route  POST  api/users
//@access PUBLIC
const registerUser = async (req, res) => {
  res.status(200).json({
    message: "register users",
  })
};



//@desc   Authenticate the user
//@route  POST  api/users/login
//@access PUBLIC
const loginUser = async (req, res) => {
  res.status(200).json({
    message: "Login users",
  })
};



//@desc   Get user data
//@route  GET  api/userS/ME
//@access PUBLIC
const getMe = async (req, res) => {
  res.status(200).json({
    message: "get users",
  })
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
