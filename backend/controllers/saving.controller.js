const investmentModel = require("../models/investment.model");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

// @desc return the required investment for the user
// @route GET /api/saving/:id
// @access private
const getSaving = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }

  const investment = await investmentModel.findById(req.params.id);
  if (!investment) {
    res.status(404);
    throw new Error("Investment not found");
  }
  res.status(200).json({ message: "Investment found successfully", investment });
});

// @desc return all the investments for the user
// @route GET /api/saving
// @access private
const getAllSavings = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const investments = await investmentModel.find();
  if (investments.length === 0) {
    res.status(200).json({ message: "No investments found for the user", investments });
  }
  res.status(200).json({ message: "Investments found successfully", investments });
});


// @desc update the required investment
// @route PATCH /api/saving/:id
// @access private
const updateSaving = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const investment = await investmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!investment) {
    res.status(404);
    throw new Error("Investment not found");
  }
  res.status(200).json({ message: "Investment updated successfully", investment });
});

// @desc delete the required investment
// @route DELETE /api/saving/:id
// @access private
const deleteSaving = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const investment = await investmentModel.findByIdAndDelete(req.params.id);
  if (!investment) {
    res.status(404);
    throw new Error("Investment not found");
  }
  res.status(200).json({ message: "Investment deleted successfully", investment });
});

// @desc add an investment
// @route POST /api/saving
// @access private
const addSaving = asyncHandler(async (req, res) => {
  const currentUser = await userModel.findById(req.user._id)
  if (!currentUser) {
    res.status(401);
    throw new Error(`User not logged in`);
  }
  const {investmentName, amountInvested} = req.body;

  if (!investmentName || !amountInvested ) {
    return res.status(400).json({ success: false, error: "Please provide investment name, amount invested, and start date" });
  }

  const investment = await investmentModel.create({
    userID: req.user._id,
    ...req.body
  });

  res.status(201).json({ message: "Investment created successfully", investment });
});

module.exports = { getSaving, getAllSavings, addSaving, updateSaving, deleteSaving };

