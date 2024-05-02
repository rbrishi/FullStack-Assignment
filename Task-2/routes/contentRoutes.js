// routes/contentRoutes.js

const express = require('express');
const router = express.Router();
const Content = require('../models/Content'); // Import the Content model

// Endpoint to add new content
router.post('/add', async (req, res) => {
  console.log("Add endpoint hit with data:", req.body); // Log the incoming data for debugging
  try {
    // Create new content using the text provided in the request body
    const newContent = new Content({ 
      text: req.body.text,
      addCount: 1  // Initialize addCount to 1 when content is created
    });
    await newContent.save(); // Save the new content to the database
    console.log("New content saved:", newContent); // Log the newly saved content for debugging
    res.status(201).json(newContent); // Respond with the newly created content and HTTP status 201
  } catch (error) {
    console.error("Failed to add new content:", error); // Log errors if the operation fails
    res.status(500).json({ message: error.message }); // Return error message and status 500
  }
});

// Endpoint to update existing content
router.put('/update/:id', async (req, res) => {
  console.log("Update endpoint hit for ID:", req.params.id, "with data:", req.body); // Log the request details for debugging
  try {
    // Find the content by ID and update its text and increment the updateCount
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { $set: { text: req.body.text }, $inc: { updateCount: 1 } },
      { new: true } // Return the updated document
    );
    console.log("Content updated:", updatedContent); // Log the updated content for debugging
    res.json(updatedContent); // Send the updated content as response
  } catch (error) {
    console.error("Failed to update content:", error); // Log errors if the update fails
    res.status(500).json({ message: error.message }); // Return error message and status 500
  }
});

// Endpoint to get counts (addCount and updateCount) for a specific content item
router.get('/counts/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id); // Find the content by ID
    if (!content) {
      return res.status(404).json({ message: "Content not found" }); // If no content found, return 404
    }
    res.json({ addCount: content.addCount, updateCount: content.updateCount }); // Return the counts for the content
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and return status 500
  }
});

module.exports = router; // Export the router for use in other parts of the application
