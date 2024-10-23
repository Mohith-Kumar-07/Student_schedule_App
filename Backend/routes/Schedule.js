const express = require('express');
const router = express.Router();
const connection = require('../db');

// Subbranch: View courses for the student under a specific schedule
router.get('/schedule/:student_id/courses', (req, res) => {
    const student_id = req.params.student_id;

    const query = `
        SELECT c.course_name, c.course_code, c.credits, c.meeting_days, c.meeting_times, i.instructor_name
        FROM courses c
        JOIN schedules sc ON sc.schedule_id = c.schedule_id
        JOIN instructors i ON i.instructor_id = c.instructor_id
        WHERE sc.student_id = ?
    `;

    connection.query(query, [student_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            res.json({ success: true, courses: results });
        } else {
            res.json({ success: false, message: 'No courses found for this student.' });
        }
    });
});

module.exports = router;
