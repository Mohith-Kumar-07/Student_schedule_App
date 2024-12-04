import React, { useState } from 'react';
import Login from './Login';
import ScheduleView from './ScheduleView';
import CourseView from './CourseView';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToSchedule = () => {
    setSelectedCourseId(null);
  };

  const handleLogout = () => {
    setStudentData(null); // Clear student data
  };

  return (
    <div className="App">
      {studentData ? (
        <>
          <header className="d-flex justify-content-between align-items-center p-3 bg-light">
  <h1 className="m-0">Student Schedule App</h1>
  <button className="btn btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleLogout}>
    Logout
  </button>
</header>

          {selectedCourseId ? (
            <CourseView courseId={selectedCourseId} onBack={handleBackToSchedule} />
          ) : (
            <ScheduleView
              studentId={studentData.studentId}
              studentName={{ firstName: studentData.firstName, lastName: studentData.lastName }}
              onSelectCourse={handleSelectCourse}
            />
          )}
        </>
      ) : (
        <Login setStudentData={setStudentData} />
      )}
    </div>
  );
}

export default App;
