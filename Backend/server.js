const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login'); // Import login route
const scheduleRoute = require('./routes/schedule'); // Import schedule route

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Use the routes
app.use('/api', loginRoute); // Set the base route for login
app.use('/api', scheduleRoute); // Set the base route for schedule

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
