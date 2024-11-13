import React, { useState } from 'react';

// Dummy ScheduleView component
const ScheduleView = ({ onSelectCourse }) => {
  return (
    <div>
      <h2>Schedule View (Test)</h2>
      <button onClick={() => onSelectCourse(1)}>View Course 1</button>
      <button onClick={() => onSelectCourse(2)}>View Course 2</button>
    </div>
  );
};

// Dummy CourseView component
const CourseView = ({ courseId, onBack }) => {
  return (
    <div>
      <h2>Course View (Test)</h2>
      <p>Showing details for Course ID: {courseId}</p>
      <button onClick={onBack}>Back to Schedule</button>
    </div>
  );
};

// Main AppTest component to handle navigation
const AppTest = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleSelectCourse = (courseId) => {
    console.log("Selected course ID:", courseId);  // Debugging line
    setSelectedCourseId(courseId);
  };

  const handleBackToSchedule = () => {
    setSelectedCourseId(null);
  };

  return (
    <div>
      <h1>Test Navigation App</h1>
      {selectedCourseId ? (
        <CourseView courseId={selectedCourseId} onBack={handleBackToSchedule} />
      ) : (
        <ScheduleView onSelectCourse={handleSelectCourse} />
      )}
    </div>
  );
};

export default AppTest;
