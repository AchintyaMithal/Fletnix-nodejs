const mongoose = require("mongoose");

// Database shows schema
const showSchema = new mongoose.Schema({
  show_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: false,
  },
  cast: {
    type: [String],
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  date_added: {
    type: Date,
    required: false,
  },
  release_year: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  listed_in: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Show", showSchema);
