const asyncHandler = require("express-async-handler");
const budgetModel = require("../models/budget.model");
const userModel = require("../models/user.model");

// @desc add an budget for the current user
// @route POST /api/budget
// @access private
const addBudget = asyncHandler(async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  if (!startDate) startDate = Date.now;
  const budget = await budgetModel.create({
    userID: req.user._id,
    category,
    amount,
    spentAmount: 0,
    startDate,
    endDate
  });
  res
    .status(201)
    .json({ message: "new budget added successfully", budget });
});

// @desc returning all the budgets for the current user
// @route GET /api/budget
// @access private
const getAllBudget = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const budgets = await budgetModel.find({ userID: req.user._id });
  if (!budgets) {
    res.status(404);
    throw new Error("No budget details found");
  }
  res.status(200).json({ message: "budget details found", budgets });
});

// @desc returning a budget for the current user by id
// @route GET /api/budget/:id
// @access private
const getBudget = asyncHandler(async (req, res) => {
  const currentUser = await userModel.find(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const budget = await budgetModel.find({ _id: req.params.id, userID: req.user._id });
  if (!budget) {
    res.status(404);
    throw new Error("Invalid budget id");
  }
  res.status(200).json({ message: "budget details found", budget });
});

// @desc updating the requested budget
// @route PATCH /api/budget/:id
// @access private
const updateBudget = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const budget = await budgetModel.find({ _id: req.params.id, userID: req.user._id });
  if (!budget) {
    res.status(404);
    throw new Error("Invalid budget id");
  }
  budget.category = req.body.category || budget.category;
  budget.amount = req.body.amount || budget.amount;
  budget.endDate = req.body.endDate || budget.endDate;
  budget.startDate = req.body.startDate || budget.startDate;
  await budget.save();
  res.status(200).json({ message: "budget updated successfully", budget });
})

// @desc deleting the requested budget
// @route DELETE /api/budget/:id
// @access private
const deleteBudget = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const budget = await budgetModel.find({ _id: req.params.id, userID: currentUser._id });
  if (!budget) {
    res.status(404);
    throw new Error("Invalid budget id");
  }
  await budget.remove();
  res.status(200).json({ message: "budget deleted successfully", budget });
});

module.exports = { addBudget, getAllBudget, getBudget, deleteBudget, updateBudget }


