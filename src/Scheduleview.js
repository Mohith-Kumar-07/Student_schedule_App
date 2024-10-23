// src/ScheduleView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleView = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Retrieve student info from local storage
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    
    useEffect(() => {
        axios.get(`/api/schedule/${studentInfo.studentId}`)
            .then(response => {
                if (response.data.success) {
                    setSchedule(response.data.schedule);
                } else {
                    setError(response.data.message);
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching schedule');
                setLoading(false);
            });
    }, [studentInfo.studentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="schedule-container">
            <h2>
                Welcome, {studentInfo.firstName} {studentInfo.lastName} - {studentInfo.semester} {studentInfo.year}
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Course Number</th>
                        <th>Course Name</th>
                        <th>Section Number</th>
                        <th>Meeting Room</th>
                        <th>Meeting Days</th>
                        <th>Meeting Times</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((course, index) => (
                        <tr key={index}>
                            <td>{course.course_number}</td>
                            <td>{course.course_name}</td>
                            <td>{course.section_number}</td>
                            <td>{course.meeting_room}</td>
                            <td>{course.meeting_days}</td>
                            <td>{course.meeting_times}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scheduleview;
