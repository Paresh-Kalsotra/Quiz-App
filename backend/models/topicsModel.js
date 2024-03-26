const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topics: [String],
});

const topic = mongoose.model("topic", topicSchema);

module.exports = topic;
