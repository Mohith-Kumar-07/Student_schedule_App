import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseView = ({ student_id }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch course details data
    axios.get(`/schedule/${student_id}/courses`)
      .then(response => {
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          setError('No courses found for this student');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching course details');
        setLoading(false);
      });
  }, [student_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Course Schedule</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <p><strong>Course Name:</strong> {course.course_name}</p>
              <p><strong>Course Code:</strong> {course.course_code}</p>
              <p><strong>Credits:</strong> {course.credits}</p>
              <p><strong>Meeting Days:</strong> {course.meeting_days}</p>
              <p><strong>Meeting Times:</strong> {course.meeting_times}</p>
              <p><strong>Instructor:</strong> {course.instructor_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseView;
