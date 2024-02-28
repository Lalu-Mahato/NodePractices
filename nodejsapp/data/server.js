const express = require("express");
const statusMonitor = require("express-status-monitor");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Use express-status-monitor middleware
app.use(statusMonitor());

// Serve static files (e.g., Chart.js library)
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/status", (req, res) => {
  // Implement your status data retrieval logic here
  const statusData = {
    cpu: 20,
    memory: 40,
    uptime: 123456,
    // Add other metrics as needed
  };
  res.json(statusData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
