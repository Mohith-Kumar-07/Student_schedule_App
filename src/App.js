import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseView from './CourseView';  // Import the CourseView component
import Login from './Login';  // Your existing login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/course/:course_id" element={<CourseView />} />
      </Routes>
    </Router>
  );
}

export default App;
