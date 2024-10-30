const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:studentId', (req, res) => {
  const { studentId } = req.params;

  const query = `
    SELECT c.course_code AS course_number, c.course_name, e.section_number, 
           e.meeting_room, e.meeting_days, e.meeting_times 
    FROM courses c
    JOIN enrollments e ON c.course_id = e.course_id
    WHERE e.student_id = ? AND e.semester = 'Fall' AND e.year = '2024'`;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('No courses found for this student');
    }
    res.json(results);
  });
});

module.exports = router;
