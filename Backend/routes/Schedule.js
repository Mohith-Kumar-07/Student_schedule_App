const express = require('express');
const router = express.Router();
const connection = require('../db'); 

// Route to get the schedule for a student
router.get('/schedule/:student_id', (req, res) => {
    const student_id = req.params.student_id;

    // SQL query to fetch the schedule data for the student from 'schedules' table
    const query = 'SELECT * FROM schedules WHERE student_id = ?';
    
    connection.query(query, [student_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        
        if (results.length > 0) {
            // If schedule data is found, return it
            res.json({ success: true, schedule: results });
        } else {
            // If no schedule is found, send an error response
            res.json({ success: false, message: 'No schedule found for this student' });
        }
    });
});

module.exports = router;
