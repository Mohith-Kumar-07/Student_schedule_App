const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Your DB host
  user: 'admin', // Your DB username
  password: 'admin123', // Your DB password
  database: 'student_schedule_app' // Your DB name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
