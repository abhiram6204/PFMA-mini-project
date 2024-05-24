const asyncHandler = require("express-async-handler");
const expenseModel = require('../models/expense.model')
const userModel = require("../models/user.model")

// @desc returning all the expenses for the current user
// @route GET /api/expense
// @access private
const getAllExpenses = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not logged in`);
    }
    const expenses = await expenseModel.find();
    if (!expenses) {
        res.status(200).json({ message: "no expenses found for the currect user", expenses });
    }
    res.status(200).json({ message: "Expenses found for the currect user", expenses });
});

// @desc add an expense for the current user
// @route POST /api/expense
// @access private
const addExpense = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not logged in`);
    }
    const expense = await expenseModel.create({
        userID: req.user._id,
        date: req.body.date,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description || " "
    });
    const newExpense = await expense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
});

// @desc returning the expense requested for the current user
// @route GET /api/expense
// @access private
const getExpense = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not logged in`);
    }
    const expense = await expenseModel.find({ _id: req.params.id, userID: currentUser._id });
    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }
    res.status(200).json({ message: "Expense found for the current user", expense })
});

// @desc updating the requested expense
// @route PATCH /api/expense/:id
// @access private
const updateExpense = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not logged in`);
    }
    const updatedExpense = await expenseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExpense) {
        res.status(404);
        throw new Error("Expense not found for the user");
    }
    res.status(200).json({ message: "Expense updated successfully" , updatedExpense});
});

// @desc deleting the requested budget
// @route DELETE /api/expense/:id
// @access private
const deleteExpense = asyncHandler(async (req, res) => {
    const currentUser = await userModel.findById(req.user._id)
    if (!currentUser) {
        res.status(401);
        throw new Error(`User not logged in`);
    }
    const expense = await expenseModel.findByIdAndDelete(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error("Expense not found for the user");
    }
    res.status(200).json({ message: "Expense deleted successfully" , expense});
});

module.exports = {
    getAllExpenses,
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense
};
