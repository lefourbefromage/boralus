import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HousePage from './pages/HousePage';
import ChestPage from './pages/ChestPage';
import BookPage from './pages/BookPage';
import MagePage from './pages/MagePage';
import FromagePage from './pages/FromagePage';
import EggPage from './pages/EggPage';
import GobelinPage from './pages/GobelinPage';
import LashaPage from './pages/LashaPage';

const App: React.FC = () => {
  const clearLocalStorage = () => {
    localStorage.clear(); // Supprime la clé spécifique
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/chest" element={<ChestPage />} />
        <Route path="/registre" element={<BookPage />} />
        <Route path="/milhouse" element={<MagePage />} />
        <Route path="/fromage" element={<FromagePage />} />
        <Route path="/egg" element={<EggPage />} />
        <Route path="/gobelin" element={<GobelinPage />} />
        <Route path='/lasha' element={<LashaPage />} />
      </Routes>

      <a href="#" className="clear-button" onClick={clearLocalStorage} style={{display:'none', background: 'white', color: 'black', position: 'fixed', right:'10px', top:'10px', padding: '10px'}}>
        Reset local storage
      </a>
    </Router>
    
  );
};

export default App;