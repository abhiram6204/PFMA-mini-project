import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Income from "./components/income/Income"
import Expense  from "./components/expense/Expense"
import Budget from "./components/budget/Budget"
import Goals from "./components/goals/Goals"
import Investment from "./components/investment/Investment"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  return (
    <>
      <BrowserRouter>
        <div className="nav">
          {!isLoggedIn && (
            <ul>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
          {isLoggedIn && (
            <ul>
              <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/income">Income</Link></li>
            <li><Link className="nav-link" to="/expense">Expense</Link></li>
            <li><Link className="nav-link" to="/budget">Budget</Link></li>
            <li><Link className="nav-link" to="/saving">Savings and Investments</Link></li>
            <li><Link className="nav-link" to="/goal">Goals</Link></li>
            </ul>
          )}
        </div>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/saving" element={<Investment />} />
          <Route path="/goal" element={<Goals />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
