const bcrypt = require("bcrypt");

// Hash the password with a specified number of salt rounds
const hashPassword = async (plainPassword) => {
  const SALT_ROUNDS = 10;

  try {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
  } catch (err) {
    console.error("Error while hashing password:", err.message);
    throw new Error("Failed to hash password");
  }
};

// Compare a plain text password with a hashed password
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    console.error("Error while verifying password:", err.message);
    throw new Error("Password verification failed");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
