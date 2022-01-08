import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import axios, { AxiosResponse } from 'axios';
import './App.css';

function App() {
  const [bird, setBird] = useState("")
  
  const fetchOurData = async () => {
    const response = await axios.get("http://localhost:1000/") as AxiosResponse<string, string>
    setBird(response.data)
  }

  useEffect(() => {
    fetchOurData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {bird}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
