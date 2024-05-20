const expenseModel=require('../models/expense.model')
const user=require("../models/user.model")
// const expenseModel=require('../routes/expense.routes')
// const user
// async function 

// Controller function to get all expenses
const GetAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to create a new expense
const AddExpense = async (req, res) => {
    const expense = new expenseModel({
        userID: req.body.userID,
        date: req.body.date,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description
    });
    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to get a specific expense by ID
const GetExpenseById = async (req, res) => {
    try {
        const expense = await expenseModel.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to update an existing expense
const UpdateExpenseById = async (req, res) => {
    try {
        const updatedExpense = await expenseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to delete an expense
const DeleteExpense = async (req, res) => {
    try {
        await expenseModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    GetAllExpenses,
    AddExpense,
    GetExpenseById,
    UpdateExpenseById,
    DeleteExpense
};
