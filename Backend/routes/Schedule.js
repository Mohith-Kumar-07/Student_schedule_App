const express = require('express');
const router = express.Router();
const connection = require('../db');  // Adjust this based on your setup

// Schedule view route for fetching course details
router.get('/course/:course_id', (req, res) => {
    const course_id = req.params.course_id;

    const query = `
        SELECT c.course_name, c.course_code, c.description, c.credits, 
               i.instructor_name, s.schedule_day, s.schedule_time, s.room
        FROM courses c
        JOIN instructors i ON c.instructor_id = i.instructor_id
        JOIN schedule s ON s.course_id = c.course_id
        WHERE c.course_id = ?;
    `;

    connection.query(query, [course_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            const courseDetails = {
                course_name: results[0].course_name,
                course_code: results[0].course_code,
                description: results[0].description,
                credits: results[0].credits,
                instructor: results[0].instructor_name,
                schedule: results.map(row => ({
                    day: row.schedule_day,
                    time: row.schedule_time,
                    room: row.room
                }))
            };
            res.json({ success: true, courseDetails });
        } else {
            res.json({ success: false, message: 'No course found with this ID' });
        }
    });
});

module.exports = router;
