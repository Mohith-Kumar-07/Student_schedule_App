import React, { useState, useEffect } from 'react';
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
    <div
      className="schedule-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/vcu_back1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '100vh',
        color: '#fff',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2>Fall 2024 Schedule for {studentName.firstName} {studentName.lastName}</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleView;
