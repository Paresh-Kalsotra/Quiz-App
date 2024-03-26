const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.post("/signup", userController.signupUser);

router.post("/login", userController.loginUser);

module.exports = router;
