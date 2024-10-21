import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseView = ({ course_id }) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch course details data
    axios.get(`/course/${course_id}`)
      .then(response => {
        setCourseDetails(response.data);
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
    <div>
      <h2>Course Details</h2>
      <p>Course Name: {courseDetails.course_name}</p>
      <p>Instructor: {courseDetails.instructor}</p>
      <p>Schedule: {courseDetails.schedule}</p>
      <p>Description: {courseDetails.description}</p>
    </div>
  );
};

export default CourseView;
