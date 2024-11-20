import React, { useEffect, useState } from 'react';
import './ScheduleView.css';

function ScheduleView({ studentId, studentName, onSelectCourse }) {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`/api/schedule/${studentId}`);
        if (!response.ok) throw new Error('Failed to load schedule');

        const data = await response.json();
        setSchedule(data);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule');
      }
    };

    if (studentId) fetchSchedule();
  }, [studentId]);

  return (
    <div className="container schedule-container">
      <h2>Fall 2024 Schedule for {studentName.firstName} {studentName.lastName}</h2>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
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
            {schedule.map((course, i) => (
              <tr key={i}>
                <td>{course.course_number}</td>
                <td>{course.course_name}</td>
                <td>{course.section_number}</td>
                <td>{course.meeting_room}</td>
                <td>{course.meeting_days}</td>
                <td>{course.meeting_times}</td>
                <td>
                  <button 
                    className="btn btn-info"
                    onClick={() => onSelectCourse(course.course_id)}
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
