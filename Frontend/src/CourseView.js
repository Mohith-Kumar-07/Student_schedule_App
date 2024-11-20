import React, { useState, useEffect } from 'react';
import './CourseView.css';

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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className="container course-view-container">
      <button className="btn btn-secondary mb-3" onClick={onBack}>Back to Schedule</button>
      {courseDetails && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{courseDetails.course_name}</h3>
            <p><strong>Course Code:</strong> {courseDetails.course_code}</p>
            <p><strong>Section:</strong> {courseDetails.section_number}</p>
            <p><strong>Instructor:</strong> {courseDetails.instructor_name}</p>
            <p><strong>Student Count:</strong> {courseDetails.student_count}</p>
            <p><strong>Description:</strong> {courseDetails.description}</p>
            <p><strong>Modality:</strong> {courseDetails.modality}</p>
            <p><strong>Credits:</strong> {courseDetails.credits}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseView;
