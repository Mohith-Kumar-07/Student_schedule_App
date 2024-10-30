const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/login - Verifies student credentials
router.post('/', (req, res) => {
  const { studentId, password } = req.body;
  console.log('Received studentId:', studentId);
  console.log('Received password:', password);

  const query = 'SELECT * FROM students WHERE student_id = ? AND password = ?';
  db.query(query, [studentId, password], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    if (result.length === 0) {
      return res.status(401).send('Invalid Student ID or Password');
    }
    res.json({
      studentId: result[0].student_id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
    });
  });
});

module.exports = router;
