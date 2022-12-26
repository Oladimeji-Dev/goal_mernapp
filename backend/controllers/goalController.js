//@desc   Get goals
//@route  Get  api/goals
//@access Private
const getGoal = (req, res) => {
  res.status(200).json({
    message: "get Goals",
  });
};

//@desc   Set goals
//@route  Post  api/goals
//@access Private
const setGoal = (req, res) => {
  res.status(200).json({
    message: "Create  Goals",
  });
};


//@desc   Update goals
//@route  Put  api/goals
//@access Private
const updateGoal = (req, res) => {
  res.status(200).json({
    message: `Update Goals ${req.params.id}`,
  });
};


//@desc   Delete goals
//@route  Delete  api/goals
//@access Private
const deleteGoal = (req, res) => {
  res.status(200).json({
    message: `Delete Goals ${req.params.id}`,
  });
};

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
