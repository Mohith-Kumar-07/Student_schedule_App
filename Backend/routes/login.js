const express = require('express');
const router = express.Router();
const connection = require('../db');  // Make sure this path points to your db.js

// Route to handle login
router.post('/login', (req, res) => {
    const { student_id, password } = req.body;

    // Query to check if the user exists in the database
    const query = 'SELECT * FROM students WHERE student_id = ? AND password = ?';
    connection.query(query, [student_id, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
