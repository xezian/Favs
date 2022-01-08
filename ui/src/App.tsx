import React from 'react';
import { Routes, Route } from "react-router-dom";
import Search from './components/Search';
import Bank from './components/Bank';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        🏦
      </header>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/bank/:bankId" element={<Bank />} />
      </Routes>
    </div>
  );
}

export default App;
