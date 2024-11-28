const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel.js");
const { verifyPassword, hashPassword } = require("../helpers/authHelper.js");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Validate input fields
    if (!email || !password || !age || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password, age) are required.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `The email ${email} is already registered. Please log in.`,
      });
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User successfully registered.",
      newUser: {
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        _id: newUser._id,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the account. Please try again later.",
    });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email or register.",
      });
    }

    // Compare password
    const passwordIsValid = await verifyPassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate JWT token
    const token = JWT.sign(
      { _id: user._id, email: user.email, name: user.name, age: user.age },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.status(200).json({
      success: true,
      message: "Successfully logged in.",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};

module.exports = { registerUser, loginUser };
