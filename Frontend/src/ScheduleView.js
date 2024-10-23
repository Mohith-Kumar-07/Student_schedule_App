import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleView({ studentId }) {
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
    <div>
      <h2>Your Course Schedule</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {schedule.map((course, index) => (
            <li key={index}>
              <strong>{course.course_name}</strong> - {course.course_number} (Section {course.section_number})
              <br />
              Room: {course.meeting_room} | Days: {course.meeting_days} | Time: {course.meeting_times}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScheduleView;
