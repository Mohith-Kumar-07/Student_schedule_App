import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseView.css';  // Create this CSS for styling

const CourseView = ({ course_id }) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/course/${course_id}`)
      .then(response => {
        if (response.data.success) {
          setCourseDetails(response.data.courseDetails);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching course details');
        setLoading(false);
      });
  }, [course_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="course-details-container">
      <h1>{courseDetails.course_name}</h1>
      <p><strong>Course Code:</strong> {courseDetails.course_code}</p>
      <p><strong>Description:</strong> {courseDetails.description}</p>
      <p><strong>Credits:</strong> {courseDetails.credits}</p>
      <p><strong>Instructor:</strong> {courseDetails.instructor}</p>

      <h2>Schedule</h2>
      <table className="course-schedule">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {courseDetails.schedule && courseDetails.schedule.map((sched, index) => (
            <tr key={index}>
              <td>{sched.day}</td>
              <td>{sched.time}</td>
              <td>{sched.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseView;
