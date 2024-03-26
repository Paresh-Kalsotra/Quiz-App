require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./router/userRouter");
const quizRouter = require("./router/quizRouter");
const verifyToken = require("./middleware/tokenCheck");

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;

//-----connecting to mongo db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//-----middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors());

//------routers
// app.use("/api/quiz", verifyToken, quizRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
