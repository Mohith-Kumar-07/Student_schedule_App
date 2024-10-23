const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path to your db.js
const bcrypt = require('bcrypt'); // Optional: For secure password handling

// Login route
router.post('/login', (req, res) => {
    const { student_id, password } = req.body;

    const query = 'SELECT * FROM students WHERE student_id = ?';
    connection.query(query, [student_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }

        if (results.length > 0) {
            const student = results[0];

            // Optional: Use bcrypt for password comparison if passwords are hashed
            if (password === student.password) { // bcrypt.compareSync(password, student.password) if using bcrypt
                // Store session data (using session or JWT tokens as required)
                req.session.student = {
                    id: student.student_id,
                    firstName: student.first_name,
                    lastName: student.last_name,
                };

                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid Student ID or Password' });
            }
        } else {
            res.json({ success: false, message: 'Invalid Student ID or Password' });
        }
    });
});

module.exports = router;
