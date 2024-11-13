import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScheduleView.css';

function ScheduleView({ studentId, studentName, onSelectCourse }) {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`/api/schedule/${studentId}`);
        setSchedule(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule');
      }
    };

    if (studentId) fetchSchedule();
  }, [studentId]);

  return (
    <div className="schedule-container">
      <h2>Fall 2024 Schedule for {studentName.firstName} {studentName.lastName}</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="course-schedule">
          <thead>
            <tr>
              <th>Course Number</th>
              <th>Course Name</th>
              <th>Section</th>
              <th>Room</th>
              <th>Days</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_number}</td>
                <td>{course.course_name}</td>
                <td>{course.section_number}</td>
                <td>{course.meeting_room}</td>
                <td>{course.meeting_days}</td>
                <td>{course.meeting_times}</td>
                <td>
                  <button 
                    onClick={() => {
                      console.log("Button clicked for course_id:", course.course_id);
                      onSelectCourse(course.course_id);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScheduleView;
