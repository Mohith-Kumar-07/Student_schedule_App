import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Scheduleview from './Scheduleview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedule/:student_id" element={<Scheduleview />} />
      </Routes>
    </Router>
  );
}

export default App;
