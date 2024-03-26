import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../features/topic/topicSlice";
import quizReducer from "../features/quiz/quizSlice";

export default configureStore({
  reducer: {
    topic: topicReducer,
    quiz: quizReducer,
  },
});
