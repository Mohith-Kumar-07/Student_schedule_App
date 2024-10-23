import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ScheduleView() {
  const { student_id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`/api/schedule/${student_id}`);
        if (response.data.success) {
          setSchedule(response.data.schedule);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage('Failed to load schedule. Please try again later.');
      }
    };

    fetchSchedule();
  }, [student_id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      {schedule ? (
        <h1>
          Welcome, {schedule.firstName} {schedule.lastName} - {schedule.semester} {schedule.year}
        </h1>
      ) : (
        <p>Loading schedule...</p>
      )}
    </div>
  );
}

export default ScheduleView;
