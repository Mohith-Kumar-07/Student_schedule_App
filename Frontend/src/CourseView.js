import React, { useState, useEffect } from 'react';

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

  if (loading) return <div className="text-secondary fs-5 text-center">Loading...</div>;
  if (error) return <div className="text-danger fs-5 text-center">{error}</div>;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4 bg-light min-vh-100">
      <button className="btn btn-primary mb-3" onClick={onBack}>Back</button>
      {courseDetails && (
        <div className="card shadow-sm p-4 bg-white rounded" style={{ maxWidth: '600px', width: '100%' }}>
          <h3 className="card-title mb-3">{courseDetails.course_name}</h3>
          <p className="text-muted">Course Code: <strong>{courseDetails.course_code}</strong></p>
          <p className="text-muted">Section: <strong>{courseDetails.section_number}</strong></p>
          <p className="text-muted">Instructor: <strong>{courseDetails.instructor_name}</strong></p>
          <p className="text-muted">Student Count: <strong>{courseDetails.student_count}</strong></p>
          <p className="text-muted">Description: <strong>{courseDetails.description}</strong></p>
          <p className="text-muted">Modality: <strong>{courseDetails.modality}</strong></p>
          <p className="text-muted">Credits: <strong>{courseDetails.credits}</strong></p>
        </div>
      )}
    </div>
  );
};

export default CourseView;
