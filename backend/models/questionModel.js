const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  category: String,
  topic: String,
  choices: [{ id: String, content: String }],
  answers: [String],
});

const questionModel = mongoose.model("question", questionSchema);

module.exports = questionModel;
