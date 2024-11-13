const express = require('express');
const cors = require('cors');
const app = express();

const loginRoute = require('./routes/login');
const scheduleRoute = require('./routes/schedule');
const courseRoute = require('./routes/course');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Register routes
app.use('/api/login', loginRoute);
app.use('/api/schedule', scheduleRoute);
app.use('/api/course', courseRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
