import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HousePage from './pages/HousePage';
import ChestPage from './pages/ChestPage';
import BagPage from './pages/ChestPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/chest" element={<ChestPage />} />
        <Route path="/bag" element={<BagPage />} />
      </Routes>
    </Router>
  );
};

export default App;