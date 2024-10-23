import React, { useState } from 'react';
import Login from './Login';
import ScheduleView from './ScheduleView';

function App() {
  const [studentData, setStudentData] = useState(null);

  return (
    <div className="App">
      <h1>Student Schedule App</h1>
      {studentData ? (
        <>
          <h2>
            Welcome, {studentData.firstName} {studentData.lastName} - Fall 2024
          </h2>
          <ScheduleView studentId={studentData.studentId} />
        </>
      ) : (
        <Login setStudentData={setStudentData} />
      )}
    </div>
  );
}

export default App;
