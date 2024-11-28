const Content = require("../model/contentModel.js");

const getAllContent = async (req, res) => {
  try {
    let query = {};

    const { age } = req?.user;
    const { type, searchStr, page_size } = req?.query;
    // Get the page number from the request
    const page = parseInt(req.params?.page) || 1;

    // Set the number of items to display per page
    const limit = parseInt(page_size) || 15;

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;

    // Define the query to get the total count
    if (type) {
      query.type = type;
    }
    if (searchStr) {
      query["$or"] = [
        { cast: { $regex: searchStr, $options: "i" } },
        { title: { $regex: searchStr, $options: "i" } },
      ];
    }

    if (age < 18) {
      query.rating = { $ne: "R" };
    }

    // Count the total number of documents for the query
    const totalCount = await Content.countDocuments(query);

    const shows = await Content.find(query).skip(skip).limit(limit);
    if (!shows) {
      res.status(404).send({
        success: false,
        message: "No shows available",
      });
    }

    res.status(200).send({
      success: true,
      shows,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ sucess: false, error });
  }
};

// Specific show handler
const getContentDetails = async (req, res) => {
  try {
    const { show_id } = req.params;

    // getting a specific show / movie
    const show = await Content.findOne({ show_id: show_id });

    if (!show) {
      res.status(404).send({
        success: false,
        message: "No shows available",
      });
    }

    res.status(200).send({
      success: true,
      show,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ sucess: false, error });
  }
};

module.exports = { getAllContent, getContentDetails };
