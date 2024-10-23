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

module.exports = router;
