import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';
import Game from "./Components/Game";
// import Square from './Components/Square';

function App() {
  useEffect(() => {
    document.title = "GOMOKU-19120524"
  }, [])

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
