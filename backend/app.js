const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors=require("cors")
require("dotenv").config();
const errorHandler = require("./middleware/errorHandling");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const incomeRoutes = require("./routes/income.routes");
const budgetRoutes = require("./routes/budget.routes");
const savingRoutes = require("./routes/saving.routes");
const goalRoutes = require("./routes/goal.routes");
// const dashboardRoutes = require("./routes/dashboard.routes");
const { validateToken } = require("./middleware/validateToken");

mongoose
  .connect("mongodb://127.0.0.1:27017/finance-manager")
  .then(() => console.log("Connected to DataBase successfully..."));

// connecting api endpoint to routes
app.use("/api/auth", userRoutes);
app.use("/api/expense", validateToken, expenseRoutes);
app.use("/api/income", validateToken, incomeRoutes);
app.use("/api/budget", validateToken, budgetRoutes);
app.use("/api/saving", validateToken, savingRoutes);
app.use("/api/goal", validateToken, goalRoutes);
// app.use("/api/dashboard", validateToken, dashboardRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
