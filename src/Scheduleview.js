import React, { useState, useEffect } from 'react';

const ScheduleView = () => {
  const [schedule, setSchedule] = useState([]);  // State to hold schedule data
  const [error, setError] = useState('');  // State to handle error messages

  // Function to fetch the schedule data from the backend
  useEffect(() => {
    fetch('http://localhost:3000/student-schedule/V-01106540')  // Replace with actual student ID
      .then(response => response.json())
      .then(data => {
        setSchedule(data);
      })
      .catch(err => {
        setError('Failed to fetch schedule data.');
      });
  }, []);

  return (
    <div>
      <h1>Student Schedule</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {schedule.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Day of the Week</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.course_id}>
                <td>{item.course_name}</td>
                <td>{item.start_time}</td>
                <td>{item.end_time}</td>
                <td>{item.day_of_week}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schedule data available</p>
      )}
    </div>
  );
};

export default ScheduleView;
