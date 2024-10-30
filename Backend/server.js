const express = require('express');
const app = express();
const loginRoute = require('./routes/login');
const scheduleRoute = require('./routes/schedule'); // Import the schedule route

app.use(express.json()); // Middleware to parse JSON

// Register routes
app.use('/api/login', loginRoute);
app.use('/api/schedule', scheduleRoute); // Register the schedule route

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
