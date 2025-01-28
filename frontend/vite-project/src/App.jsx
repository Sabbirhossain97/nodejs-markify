import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './components/Hero'
import Navbar from './components/Navbar/Navbar'
import Summarize from './components/AI/Summarize';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Hero />}
          />
          <Route
            exact
            path="/summarize"
            element={<Summarize />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App