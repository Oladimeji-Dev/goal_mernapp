//@desc   Get users
//@route  Get  api/users
//@access Private
const getUsers = async (req, res) => {

    res.status(200).json({
        message: 'get users'
    });
  };


  module.exports = {
    getUsers
  }