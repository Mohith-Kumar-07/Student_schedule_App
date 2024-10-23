import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseView from './CourseView';  // Import the CourseView component
import Login from './Login';  // Your existing login component
import Scheduleview from './Scheduleview';  // Import Scheduleview component

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<Login />} />
        {/* Schedule View Page Route */}
        <Route path="/schedule/:student_id" element={<Scheduleview />} />
        {/* Course View Page Route */}
        <Route path="/course/:course_id" element={<CourseView />} />
      </Routes>
    </Router>
  );
}

export default App;

