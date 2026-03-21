require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test route — just to confirm the server works
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Start the server
app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});
