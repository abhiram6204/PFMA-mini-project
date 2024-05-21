const express=require('express')
const app=express()
const routes=express.Router()
const {
    GetAllExpenses,
    AddExpense,
    GetExpenseById,
    UpdateExpenseById,
    DeleteExpense
  } = require("../controllers/expense.controller");
//to get the details of all expenses
routes.get('/api/expenses',GetAllExpenses);

//to add the expense 
routes.get('/api/expenses/add',AddExpense);
//to get the exopense with id 
routes.get('/api/expenses/:id',GetExpenseById);
//to update the expense 
routes.get('/api/expenses/:id/update',UpdateExpenseById);
//to delete the expense by id  
routes.get('/api/expenses/:id/delete',DeleteExpense);

//exporting the module
modules.export=routes








