// models/Content.js

// Require the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Content model with mongoose
const contentSchema = new mongoose.Schema({
  // 'text' field which is of type String and is required
  text: {
    type: String,
    required: true
  },
  // 'addCount' field to keep track of how many times content is added, initialized to 0
  addCount: {
    type: Number,
    default: 0  // Default value if not provided is 0
  },
  // 'updateCount' field to keep track of how many times content is updated, initialized to 0
  updateCount: {
    type: Number,
    default: 0  // Default value if not provided is 0
  }
});

// Export the model named 'Content' which uses the contentSchema
module.exports = mongoose.model('Content', contentSchema);
