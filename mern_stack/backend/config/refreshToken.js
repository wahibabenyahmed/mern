const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.Private_key, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
