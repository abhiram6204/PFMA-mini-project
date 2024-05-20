const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandling");
const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const incomeRoutes = require("./routes/income.routes");
const budgetRoutes = require("./routes/budget.routes");
const savingRoutes = require("./routes/saving.routes");
const goalRoutes = require("./routes/goal.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { validateToken } = require("./middleware/validateToken");

mongoose
  .connect("mongodb://127.0.0.1:27017/finance-manager")
  .then(() => console.log("Connected to DataBase successfully..."));

const app = express();
const port = process.env.PORT || 3000;

app.use(errorHandler);
app.use(express.json());

// connecting api endpoint to routes
app.use("/api/auth", userRoutes);
app.use("/api/expenses", validateToken, expenseRoutes);
app.use("/api/income", validateToken, incomeRoutes);
app.use("/api/budgets", validateToken, budgetRoutes);
app.use("/api/savings", validateToken, savingRoutes);
app.use("/api/goals", validateToken, goalRoutes);
app.use("/api/dashboard", validateToken, dashboardRoutes);

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
