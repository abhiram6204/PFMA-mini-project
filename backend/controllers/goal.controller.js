const asyncHandler = require("express-async-handler");
const Goal = require("../models/income.model");
const User = require("../models/user.model");

// add a new goal

const addGoal = asyncHandler(async (req, res) => {
    const { goalName, targetAmount, currentAmount, targetDate, description } = req.body;
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
        res.status(400);
        throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const goal = await Income.create({
        userID: req.user._id,
        goalName,
        targetAmount,
        currentAmount,
        targetDate,
        description
    });
    if (!goal) {
        res.status(400);
        throw new Error(" data invalid");
    }
    res
        .status(201)
        .json({ _id: goal._id, goalName: goal.goalName, targetAmount: targetAmount, user: req.user._id });
});

//display all goals
const getAllGoals = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
        res.status(400);
        throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const goal = await Goal.find({ userID: currentUser._id })
    if (!goal) {
        res.status(400);
        throw new Error(" data invalid");
    }
    res.status(200).json(goal);
})

//display goals with particular source
const getGoal = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
        res.status(400);
        throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const goal = await Goal.find({_id:req.params.id})
    if (!goal) {
        res.status(400);
        throw new Error(" data invalid");
        }
        res.status(200).json(goal);
})
//update goal
const updateGoal = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
        res.status(400);
        throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400);
        throw new Error(" data invalid");
        }
        goal.goalName = req.body.goalName;
        goal.targetAmount = req.body.targetAmount;
        goal.currentAmount=req.body.currentAmount;
        goal.targetDate=req.body.targetAmount;
        goal.description=req.body.description;
        await goal.save()
        res.status(200).json(income);
})
//delete goal
const deleteGoal = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
        res.status(400);
        throw new Error(`There is no user with the ID ${req.user._id}`);
        }
        const goal = await Goal.findById(req.params.id)
        if (!goal) {
            res.status(400);
            throw new Error(" data invalid");
            }
            await goal.remove()
            res.status(200).json(goal);
})

module.exports={addGoal,getAllGoals,getGoal,updateGoal,deleteGoal}