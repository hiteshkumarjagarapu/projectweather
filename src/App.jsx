import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CitiesList from './CitiesList';
import WeatherPage from './WeatherPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CitiesList />} />
      <Route path="/weather/:name" element={<WeatherPage />} />
    </Routes>
  );
}

export default App;
