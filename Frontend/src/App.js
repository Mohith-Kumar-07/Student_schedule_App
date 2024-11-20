import React, { useState } from 'react';
import Login from './Login';
import ScheduleView from './ScheduleView';
import CourseView from './CourseView';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId); // Sets the course ID to trigger CourseView
  };

  const handleBackToSchedule = () => {
    setSelectedCourseId(null); // Resets the view to ScheduleView
  };

  return (
    <div className="App">
      {studentData ? (
        selectedCourseId ? (
          <CourseView courseId={selectedCourseId} onBack={handleBackToSchedule} />
        ) : (
          <ScheduleView
            studentId={studentData.studentId}
            studentName={{ firstName: studentData.firstName, lastName: studentData.lastName }}
            onSelectCourse={handleSelectCourse} // Passes handler to ScheduleView
          />
        )
      ) : (
        <Login setStudentData={setStudentData} />
      )}
    </div>
  );
}

export default App;
