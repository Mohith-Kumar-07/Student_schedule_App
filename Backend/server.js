const express = require('express');
const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Import and use routes (we’ll create them next)
const loginRoute = require('./routes/login');
const scheduleRoute = require('./routes/Schedule');
app.use('/api/login', loginRoute);
app.use('/api/schedule', scheduleRoute);

// Start server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
