import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseView.css';

const CourseView = ({ courseId, onBack }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/course/${courseId}`);
        setCourseDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course details');
        setLoading(false);
      }
    };

    if (courseId) fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="course-view-container">
      <button className="back-button" onClick={onBack}>Back to Schedule</button>
      {courseDetails && (
        <div className="course-details-card">
          <h1>{courseDetails.course_name}</h1>
          <p><strong>Course Code:</strong> {courseDetails.course_code}</p>
          <p><strong>Section:</strong> {courseDetails.section_number}</p>
          <p><strong>Instructor:</strong> {courseDetails.instructor_name}</p>
          <p><strong>Student Count:</strong> {courseDetails.student_count}</p>
          <p><strong>Description:</strong> {courseDetails.description}</p>
          <p><strong>Modality:</strong> {courseDetails.modality}</p>
          <p><strong>Credits:</strong> {courseDetails.credits}</p>
        </div>
      )}
    </div>
  );
};

export default CourseView;
