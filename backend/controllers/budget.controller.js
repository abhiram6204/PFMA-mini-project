const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");
const User = require("../models/user.model");

//add a new budget
const addBudget = asyncHandler(async (req, res) => {
    const {category,amount,spentAmount,endDate } = req.body;
    const currentUser=await User.findById(req.user._id)
    if (!currentUser) {
      res.status(400);
      throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const budget = await Budget.create({
      userID: req.user._id,
      category,
      amount,
      spentAmount,
      endDate
    });
    if (!budget) {
      res.status(400);
      throw new Error(" data invalid");
    }
    res
      .status(201)
      .json({ _id: budget._id, category: budget.category, budgetAmount: budget.amount,spentAmount:budget.spentAmount,startDate:budget.startDate,endDate:budget.endDate });
  });

  //display all budgets
  const getAllBudget = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({userID:req.user._id});
    if (!budgets) {
      res.status(400);
      throw new Error("There is no budget");
      }
      res.status(200).json(budgets);
      });

  //display a specific budget
  const getBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById({_id:req.params.id,userID:req.user._id});
    if (!budget) {
      res.status(400);
      throw new Error("There is no budget with the ID " + req.params.id);
      }
      res.status(200).json(budget);
      });

  //update budget
  const updateBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(400);
      throw new Error("There is no budget with the ID " + req.params.id);
      }
      budget.category = req.body.category;
      budget.amount = req.body.amount;
      budget.spentAmount=req.body.spentAmount;
      budget.endDate=req.body.endDate;
      budget.startDate=req.body.startDate;
      await budget.save();
      res.status(200).json(budget);
    })

  //delete budget
  const deleteBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(400);
      throw new Error("There is no budget with the ID " + req.params.id);
      }
      await budget.remove();
      res.status(200).json({ id: req.params.id });
      });
  module.exports={addBudget,getAllBudget,getBudget,deleteBudget,updateBudget}


  