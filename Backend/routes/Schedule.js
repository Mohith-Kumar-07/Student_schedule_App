// backend/routes/schedule.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Schedule view route
router.get('/schedule/:student_id', (req, res) => {
    const student_id = req.params.student_id;

    const query = `
        SELECT c.course_number, c.course_name, c.section_number, c.meeting_room, c.meeting_days, c.meeting_times
        FROM schedules sc
        JOIN courses c ON sc.course_id = c.course_id
        WHERE sc.student_id = ?
    `;

    connection.query(query, [student_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            res.json({ success: true, schedule: results });
        } else {
            res.json({ success: false, message: 'No schedule found' });
        }
    });
});

module.exports = router;
