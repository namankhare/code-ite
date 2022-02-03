import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './core/Home'
import Login from "./core/Login";
import Signup from "./core/Signup";
import Editor from "./core/Editor";
import { v4 as uuidv4 } from 'uuid';
import ContextProvider from "./context/GlobalContext"
import "../src/assets/css/DarkMode.css";






function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="join" element={<Navigate replace to={`/room/${uuidv4()}`} />} />
          <Route path="room" element={<Navigate replace to="/" />} />
          <Route path="room/:room" element={<Editor />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
