// backend/routes/login.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Login route
router.post('/login', (req, res) => {
    const { student_id, password } = req.body;

    const query = `SELECT first_name, last_name, semester, year FROM students WHERE student_id = ? AND password = ?`;
    
    connection.query(query, [student_id, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            const student = results[0];
            return res.json({ 
                success: true,
                student: {
                    firstName: student.first_name,
                    lastName: student.last_name,
                    semester: student.semester,
                    year: student.year
                }
            });
        } else {
            return res.json({ success: false, message: 'Invalid Student ID or Password' });
        }
    });
});

module.exports = router;
