const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// GET /api/schedule/:studentId - Fetches the schedule of courses for a student
router.get('/:studentId', (req, res) => {
  const { studentId } = req.params;

  // Query to get the student’s schedule
  const query = `
    SELECT course_number, course_name, section_number, meeting_room, meeting_days, meeting_times 
    FROM courses 
    WHERE student_id = ?
  `;
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results); // Send back the list of courses
  });
});

module.exports = router;
