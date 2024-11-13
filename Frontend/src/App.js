import React, { useState } from 'react';
import Login from './Login';
import ScheduleView from './ScheduleView';
import CourseView from './CourseView';
import './App.css';

function App() {
  // State to store student data after login
  const [studentData, setStudentData] = useState(null);
  
  // State to track the selected course ID for details view
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Handler to set the selected course and navigate to CourseView
  const handleSelectCourse = (courseId) => {
    console.log("Selected course ID:", courseId);
    setSelectedCourseId(courseId);
  };

  // Handler to go back to ScheduleView from CourseView
  const handleBackToSchedule = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="App">
      <h1>Student Schedule App</h1>
      
      {/* If studentData exists, show either ScheduleView or CourseView based on selectedCourseId */}
      {studentData ? (
        selectedCourseId ? (
          // Render CourseView with a back button when a course is selected
          <CourseView 
            courseId={selectedCourseId} 
            onBack={handleBackToSchedule} 
          />
        ) : (
          // Render ScheduleView by default when no course is selected
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
        // Render Login component if studentData is not set
        <Login setStudentData={setStudentData} />
      )}
    </div>
  );
}

export default App;
