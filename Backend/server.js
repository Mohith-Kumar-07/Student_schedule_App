const express = require('express');
const app = express();
const loginRoute = require('./routes/login'); // Import login route

// Middleware to parse JSON bodies
app.use(express.json());

// Register the route for login
app.use('/api/login', loginRoute); // Ensure this line is present

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
