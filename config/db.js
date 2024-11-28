const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const initializeDBConnection = async () => {
  const databaseURL = process.env.URL;

  if (!databaseURL) {
    console.error("Database URL is not defined in environment variables.");
    return;
  }

  try {
    const connection = await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connected to MongoDB at ${connection.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = initializeDBConnection;
