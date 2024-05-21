const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goal.model");
const userModel = require("../models/user.model");

// @desc add a goal for the current user
// @route POST /api/goal
// @access private
const addGoal = asyncHandler(async (req, res) => {
    const { goalName, targetAmount, currentAmount, targetDate, startDate, description } = req.body;
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not Logged in`);
    }
    if(!startDate) startDate = Date.now;
    const goal = await goalModel.create({
        userID: req.user._id,
        goalName,
        targetAmount,
        currentAmount,
        targetDate,
        startDate,
        description
    });
    res
        .status(201)
        .json({message: "Goal set successfully", goal});
});

// @desc get all goals for the current user
// @route GET /api/goal
// @access private
const getAllGoals = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not Logged in`);
    }
    const goals = await goalModel.find({ userID: currentUser._id })
    if (!goals) {
        res.status(404);
        throw new Error("Goals for the user not found");
    }
    res.status(200).json({message: "Goals found", goals});
})

// @desc get a goal for the current user
// @route GET /api/goal/:id
// @access private
const getGoal = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not Logged in`);
    }
    const goal = await goalModel.find({_id: req.params.id, userID: currentUser._id})
    if (!goal) {
        res.status(404);
        throw new Error("Invalid Goal id");
    }
    res.status(200).json({message: "Goal found", goal});
})

// @desc update a requested goal
// @route PATCH /api/goal/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not Logged in`);
    }
    const goal = await goalModel.find({_id: req.params.id, userID: currentUser._id})
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }
    goal.goalName = req.body.goalName || goal.goalName;
    goal.targetAmount = req.body.targetAmount || goal.targetAmount;
    goal.currentAmount = req.body.currentAmount || goal.currentAmount;
    goal.startDate = req.body.startDate || goal.startDate;
    goal.targetDate = req.body.targetDate || goal.targetDate;
    goal.description = req.body.description || goal.description;
    await goal.save()
    res.status(200).json({message: "Goal successfully updated", goal});
})

// @desc delete a requested goal
// @route DELETE /api/goal/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not Logged in`);
    }
    const goal = await goalModel.find({_id: req.params.id, userID: currentUser._id})
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }
    await goal.remove()
    res.status(200).json({message: "Goal removed successfully", goal});
})

module.exports = { addGoal, getAllGoals, getGoal, updateGoal, deleteGoal }