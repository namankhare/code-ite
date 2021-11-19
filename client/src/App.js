import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './core/Home'
import Login from "./core/Login";
import Editor from "./core/Editor";
import { v4 as uuidv4 } from 'uuid';
import Whiteboard from "./components/Whiteboard";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Navigate replace to={`/room/${uuidv4()}`} />} />
        <Route path="/room" element={<Navigate replace to="/" />} />
        <Route path="/room/:room" element={<Editor />} />
        <Route path="white" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
}

export default App;
