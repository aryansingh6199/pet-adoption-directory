import React from 'react';
import Navbar from './components/Navbar';
import WelcomeMessage from './components/WelcomeMessage';
import AvailablePets from './components/AvaliablePets';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WelcomeMessage />
      <AvailablePets />
    </div>
  );
}

export default App;