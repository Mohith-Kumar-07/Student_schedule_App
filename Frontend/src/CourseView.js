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

  if (loading) return <div className="text-secondary text-center fs-5">Loading...</div>;
  if (error) return <div className="text-danger text-center fs-5">{error}</div>;

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={onBack}>Back to Schedule</button>
      <div className="card shadow-lg p-4 bg-white rounded">
        <h3 className="card-title">{courseDetails.description}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Course ID:</strong> {courseDetails.course_id}</li>
          <li className="list-group-item"><strong>Instructor:</strong> {courseDetails.instructor_name}</li>
          <li className="list-group-item"><strong>Student Count:</strong> {courseDetails.student_count}</li>
          <li className="list-group-item"><strong>Modality:</strong> {courseDetails.modality}</li>
          <li className="list-group-item"><strong>Credits:</strong> {courseDetails.credits}</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseView;
