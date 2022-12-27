const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

//@desc   Get goals
//@route  GET  api/goals
//@access Private
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc   Set goals
//@route  POST  api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add all text fields");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json({
    goal,
  });
});

//@desc   Update goals
//@route  PUT  api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized ");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: `Update Goals ${req.params.id}`,
    data: updatedGoal,
  });
});

//@desc   Delete goals
//@route  DELETE  api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  //   const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
