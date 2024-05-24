import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Income from "./components/income/Income";
import "./App.css";

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
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/income">
                  Incomes
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/budget">
                  Budgets
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/goal">
                  Goals
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/expense">
                  Expenses
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/saving">
                  Savings
                </Link>
              </li>
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
          <Route path="/budget" element={<Income />} />
          <Route path="/goal" element={<Income />} />
          <Route path="/saving" element={<Income />} />
          <Route path="/expense" element={<Income />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
