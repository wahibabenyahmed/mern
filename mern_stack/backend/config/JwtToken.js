const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.Private_key, { expiresIn: "1d" });
};

module.exports = { generateToken };