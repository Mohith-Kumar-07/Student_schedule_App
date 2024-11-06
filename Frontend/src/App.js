import React, { useState } from 'react';
import Login from './Login';
import ScheduleView from './ScheduleView';
import CourseView from './CourseView';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Function to handle selecting a course in ScheduleView
  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId); // Save the selected course ID to show details
  };

  // Function to go back to the ScheduleView
  const handleBackToSchedule = () => {
    setSelectedCourseId(null); // Reset the selected course to go back to the schedule
  };

  return (
    <div className="App">
      <h1>Student Schedule App</h1>
      {studentData ? (
        selectedCourseId ? (
          // Render CourseView when a course is selected
          <CourseView courseId={selectedCourseId} onBack={handleBackToSchedule} />
        ) : (
          // Render ScheduleView by default
          <>
            <h2>Welcome, {studentData.firstName} {studentData.lastName} - Fall 2024</h2>
            <ScheduleView 
              studentId={studentData.studentId} 
              studentName={{ firstName: studentData.firstName, lastName: studentData.lastName }} 
              onSelectCourse={handleSelectCourse} 
            />
          </>
        )
      ) : (
        // Render Login if no student data is available
        <Login setStudentData={setStudentData} />
      )}
    </div>
  );
}

export default App;
