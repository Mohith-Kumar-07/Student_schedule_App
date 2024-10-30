import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseView.css';  // Link to your CSS file for styling

const CourseView = ({ course_id, student_id }) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch course details based on course ID or student ID
    if (course_id) {
      axios.get(`/course/${course_id}`)
        .then(response => {
          if (response.data.success) {
            setCourseDetails(response.data.courseDetails);
          } else {
            setError(response.data.message);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Error fetching course details');
          setLoading(false);
        });
    } else if (student_id) {
      axios.get(`/schedule/${student_id}/courses`)
        .then(response => {
          if (response.data.success) {
            setCourses(response.data.courses);
          } else {
            setError('No courses found for this student');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Error fetching course details');
          setLoading(false);
        });
    }
  }, [course_id, student_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="course-details-container">
      {course_id ? (
        <div>
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
      ) : (
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
      )}
    </div>
  );
};

export default CourseView;
