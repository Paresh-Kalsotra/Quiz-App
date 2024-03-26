const express = require("express");
const quizController = require("../controller/quizController.js");

const router = express.Router();

//route to send topics
router.get("/topics", quizController.sendTopics);

//route to get question based on topic
router.get("/topics/:name", quizController.sendQuestions);

module.exports = router;
