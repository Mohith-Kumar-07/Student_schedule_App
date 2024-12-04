import React, { useState, useEffect } from 'react';
import './CourseView.css'; // Ensure this is included

const CourseView = ({ courseId, onBack }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/course/${courseId}`);
        if (!response.ok) throw new Error('Failed to load course details');

        const data = await response.json();
        setCourseDetails(data);
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
    <div
      className="course-view-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Snead1.png)`, // Inline background image
      }}
    >
      <button className="back-button" onClick={onBack}>
        Back to Schedule
      </button>
      {courseDetails && (
        <div className="course-card">
          <h2 className="course-title">{courseDetails.course_name}</h2>
          <p className="course-description">{courseDetails.description}</p>
          <ul className="course-details-list">
            <li><strong>Course ID:</strong> {courseDetails.course_id}</li>
            <li><strong>Instructor:</strong> {courseDetails.instructor_name}</li>
            <li><strong>Student Count:</strong> {courseDetails.student_count}</li>
            <li><strong>Modality:</strong> {courseDetails.modality}</li>
            <li><strong>Credits:</strong> {courseDetails.credits}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseView;
