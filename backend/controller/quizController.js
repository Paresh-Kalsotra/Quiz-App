const topic = require("../models/topicsModel");
const questionModel = require("../models/questionModel");
const { ObjectId } = require("mongodb");

//func to send topics from database
async function sendTopics(req, res) {
  try {
    const obj = await topic.findOne();

    res.status(200).json(obj.topics);
  } catch (error) {
    console.error("Error fetching topics:", error);

    res.status(500).json({ error: "Internal server error" });
  }
}

//func to fetch 10 random question from database
async function sendQuestions(req, res) {
  try {
    const questions = await questionModel.aggregate([
      { $match: { topic: req.params.name } },
      { $sample: { size: 5 } }, // Retrieve 10 random documents
      {
        $project: { _id: 1, title: 1, topic: 1, choices: 1 },
      }, //excluding answers
    ]);

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//func to check questions
async function checkQuestions(req, res) {
  try {
    const score = await questionModel.aggregate([
      {
        $match: {
          $or: req.body.map((item) => ({
            _id: new ObjectId(item._id),
            answers: item.answer,
          })),
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    if (!score.length) {
      return res.status(200).json("0");
    }
    res.status(200).json(score[0].count);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

module.exports = { sendTopics, sendQuestions, checkQuestions };
