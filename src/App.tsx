import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ARShowroom from './pages/ARShowroom';
import ChargingStations from './pages/ChargingStations';
import Maintenance from './pages/Maintenance';
import Comparison from './pages/Comparison';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showroom" element={<ARShowroom />} />
          <Route path="/charging" element={<ChargingStations />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;