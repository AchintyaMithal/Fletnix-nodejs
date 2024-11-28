const express = require("express");
const { registerUser, loginUser } = require("../controller/users.js");

// adding auth routes
// Router
const router = express.Router();

//Routing to register user
router.post("/register", registerUser);

//Routing to login user
router.post("/login", loginUser);

// exporting router
module.exports = router;

