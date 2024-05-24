import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Income from "./components/income/Income"
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="nav">
          <ul>
            <li><Link className="nav-link" to="/login">Login</Link></li>
            <li><Link className="nav-link" to="/register">Register</Link></li>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/income">Income</Link></li>
          </ul>
        </div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/income" element={<Income />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
