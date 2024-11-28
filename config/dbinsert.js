const fs = require("fs");
const csvParser = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Shows = require("../model/contentModel.js");

dotenv.config();

const FILENAME = "data.csv";
const DATABASE_URL = process.env.URL

if (!DATABASE_URL) {
  console.error("Database URL is missing. Please check your environment variables.");
  process.exit(1);
}

// Establishing MongoDB connection
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1);
});

database.once("open", () => {
  console.log("Connected to MongoDB successfully");

  let rowCount = 0;

  // Reading and processing the CSV file
  fs.createReadStream(FILENAME)
    .pipe(csvParser())
    .on("data", async (row) => {
      try {
        // Parsing CSV fields
        row.cast = String(row.cast)
          .split(",")
          .map((castMember) => castMember.trim());
        row.listed_in = String(row.listed_in)
          .split(",")
          .map((category) => category.trim());

        const newShow = new Shows(row);
        await newShow.save();

        rowCount += 1;
        console.log(`${rowCount} rows inserted`);
      } catch (error) {
        console.error("Error saving row to database:", error.message);
      }
    })
    .on("end", () => {
      console.log("CSV file processing complete.");
    })
    .on("error", (err) => {
      console.error("Error reading CSV file:", err.message);
    });
});
