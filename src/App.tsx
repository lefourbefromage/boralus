import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HousePage from './pages/HousePage';
import ChestPage from './pages/ChestPage';
import ChestOpenPage from './pages/ChestOpen';

const App: React.FC = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem('chestUnlocked'); // Supprime la clé spécifique
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/chest" element={<ChestPage />} />
        <Route path="/chest-open" element={<ChestOpenPage />} />
      </Routes>

      <a href="/house" className="clear-button" onClick={clearLocalStorage} style={{background: 'white', color: 'black', position: 'fixed', right:'10px', top:'10px', padding: '10px'}}>
        Reset local storage
      </a>
    </Router>
    
  );
};

export default App;