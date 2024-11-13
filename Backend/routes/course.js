const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this path points to your database setup

// Define the route for fetching course details
router.get('/api/course/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseDetails = await db.query('SELECT * FROM course_details WHERE course_id = ?', [courseId]);
    if (courseDetails.length > 0) {
      res.json(courseDetails[0]); // Assuming course_id is unique
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching course details' });
  }
});

module.exports = router;
