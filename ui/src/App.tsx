import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Bank from './components/Bank';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">🏦</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank/:bankId" element={<Bank />} />
      </Routes>
    </div>
  );
}

export default App;
