import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import HomePage from './components/HomePage';
import CongratsPage from './components/CongratsPage';
import GameBoard from './components/GameBoard';

function App() {
  const [gameConfig, setGameSettings] = useState(null);

  const handleStartGame = (config) => {
    const numCards =
      config.level === 'easy' ? 6 : config.level === 'medium' ? 12 : 24;

    const newConfig = { ...config, numCards };
    setGameSettings(newConfig);
    localStorage.setItem('lastGameConfig', JSON.stringify(newConfig)); // ✅ Save it
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage onStartGame={handleStartGame} />} />
        <Route path="/game" element={<GameWrapper />} />
        <Route path="/congrats" element={<CongratsPage />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Wrapper component to load settings from localStorage or navigation state
function GameWrapper() {
  const location = useLocation();
  const config = location.state || JSON.parse(localStorage.getItem('lastGameConfig'));

  return config ? (
    <GameBoard settings={config} />
  ) : (
    <Navigate to="/" />
  );
}

export default App;
