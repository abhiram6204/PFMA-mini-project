const express=require('express')
const app=express()
const routes=express.Router()

const {GetAllExpenses, GetExpenseById, AddExpense, UpdateExpenses, DeleteExpenseById} = require("../controllers/expense.controller");
//to get the details of all expenses
routes.get('/api/expenses',GetAllExpenses);

//to add the expense 
routes.get('/api/expenses/add',AddExpense);
//to get the exopense with id
routes.get('/api/expenses/:id',GetExpenseById);
//to update the expense
routes.get('/api/expenses/:id/update',UpdateExpenses);
//to delete the expense by id
routes.get('/api/expenses/:id/delete',DeleteExpenseById);

//exporting the module
modules.export=routes;









// const express = require('express');
// const router = express.Router();

// // Route to get all expenses
// router.get('/api/expenses', (req, res) => {
//     // Controller logic for getting all expenses
// });

// // Route to create a new expense
// router.post('/api/expenses/add', (req, res) => {
//     // Controller logic for adding a new expense
// });

// // Route to get a specific expense by ID
// router.get('/api/expenses/:id', (req, res) => {
//     // Controller logic for getting a specific expense by ID
// });

// // Route to update an existing expense
// router.put('/api/expenses/:id/update', (req, res) => {
//     // Controller logic for updating an existing expense
// });

// // Route to delete an expense
// router.delete('/api/expenses/:id/delete', (req, res) => {
//     // Controller logic for deleting an existing expense
// });

// module.exports = router;
