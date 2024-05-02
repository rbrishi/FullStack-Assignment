// app.js

// Load environment variables from the .env file
require('dotenv').config();

// Import necessary Node.js modules
const express = require('express');  // Express framework for handling HTTP requests
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const bodyParser = require('body-parser'); // Body-parser middleware to parse JSON bodies
const cors = require('cors'); // CORS module to allow cross-origin requests

// Import routes
const contentRoutes = require('./routes/contentRoutes');

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected successfully"))  // Log on successful connection
.catch(err => console.log("MongoDB connection error:", err));  // Log on connection error

// Use routes for API endpoints prefixed with '/api/content'
app.use('/api/content', contentRoutes);

// Define the server's listening port
// Use environment variable PORT or default to 3000 if not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log that the server is running and the port it's listening on
  console.log(`Server running on port ${PORT}`);
});
