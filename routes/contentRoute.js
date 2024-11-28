const express = require("express");
const loginTokenCheck = require("../middlewares/authMiddleWare.js");
const { getAllContent, getContentDetails } = require("../controller/content.js");

//Creating router
const router = express.Router();

//get-all movies and tv shows
router.get("/content/:page?", loginTokenCheck, getAllContent);

//get specific movie detail
router.get("/content/details/:show_id", loginTokenCheck, getContentDetails);

// exporting router
module.exports = router;
