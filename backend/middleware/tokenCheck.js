const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    let token = req.cookies.quizAppUserToken;
    jwt.verify(token, process.env.jwt_key);
    next();
  } catch (err) {
    res.status(401).json("Un Authorised"); //authentication failed
  }
};
