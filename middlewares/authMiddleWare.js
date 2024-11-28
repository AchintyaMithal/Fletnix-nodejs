const JWT = require("jsonwebtoken");

// Protecting routes on basis of token check
const loginTokenCheck = (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    const getVerfication = JWT.verify(token, process.env.JWT_SECRET);
    // Confirming that the req gets the id
    req.user = getVerfication;
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = loginTokenCheck;
