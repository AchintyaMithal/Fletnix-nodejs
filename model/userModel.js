const mongoose = require("mongoose");

// Schema for user in the database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for registration"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required for registration"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
});

module.exports = mongoose.model("User", userSchema);
