import React from "react";
import Headers from './components/header'
import Leftsec from "./components/left_section";
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Headers/>
      <Leftsec/>
     
    </div>
    </Router>
  );
}

export default App;
