const express = require('express');
const router = express.Router();
const connection = require('../db');

// Schedule view route
router.get('/schedule/:student_id', (req, res) => {
    const student_id = req.params.student_id;

    const query = `
        SELECT s.*, sc.semester, sc.year
        FROM students s
        JOIN schedules sc ON s.student_id = sc.student_id
        WHERE s.student_id = ?
    `;

    connection.query(query, [student_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            const student = results[0];
            const schedule = {
                firstName: student.first_name,
                lastName: student.last_name,
                semester: student.semester,
                year: student.year,
            };

            res.json({ success: true, schedule });
        } else {
            res.json({ success: false, message: 'No schedule found' });
        }
    });
});

// Subbranch: View courses for the student under a specific schedule
router.get('/schedule/:student_id/courses', (req, res) => {
    const student_id = req.params.student_id;

    const query = `
        SELECT c.course_name, c.course_code, c.credits
        FROM courses c
        JOIN schedules sc ON sc.schedule_id = c.schedule_id
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

// Subbranch: View assignments for a specific course
router.get('/schedule/:student_id/courses/:course_id/assignments', (req, res) => {
    const { student_id, course_id } = req.params;

    const query = `
        SELECT a.assignment_name, a.due_date, a.status
        FROM assignments a
        JOIN courses c ON c.course_id = a.course_id
        WHERE c.course_id = ? AND c.student_id = ?
    `;

    connection.query(query, [course_id, student_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            res.json({ success: true, assignments: results });
        } else {
            res.json({ success: false, message: 'No assignments found for this course.' });
        }
    });
});

module.exports = router;
