const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// POST /api/login - Verifies if the student exists
router.post('/', (req, res) => {
  const { studentId } = req.body;

  // Query to check if the student exists
  const query = 'SELECT * FROM students WHERE id = ?';
  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    if (result.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.json(result[0]); // Send student details if found
  });
});

module.exports = router;
