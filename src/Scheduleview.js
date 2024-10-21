import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Scheduleview() {
  const { student_id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/schedule/${student_id}`);
        if (response.data.success) {
          setSchedule(response.data.schedule);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error fetching schedule.');
      }
    };

    fetchSchedule();
  }, [student_id]);

  return (
    <div>
      <h2>Schedule for {student_id}</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {schedule.map((course) => (
            <li key={course.id}>{course.course_name} - {course.time}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Scheduleview;
