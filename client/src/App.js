import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './core/Home'
import Login from "./core/Login";
import Editor from "./core/Editor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
