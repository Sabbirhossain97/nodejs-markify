import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/index"
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App