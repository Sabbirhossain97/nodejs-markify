import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Home from "./components/Home/index"
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
            element={<Home />}
          />
          <Route
            exact
            path="/headlines"
            element={<Main />}
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