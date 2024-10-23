const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Optional, helps with cross-origin requests
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',          // Hostname (localhost for local MySQL)
  user: 'admin',               
  password: 'admin123',  
  database: 'student_schedule_app',  // The name of the database you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Example route to fetch data from a table
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';  // SQL query to fetch student data
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(result);  // Return the results as JSON
  });
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
