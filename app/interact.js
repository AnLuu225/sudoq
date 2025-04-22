import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './app/page';
import PlayPage from './app/play_page';
import CreatePage from './app/create_page';
import AboutPage from './app/about_page';

const Clicker = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default Clicker;
