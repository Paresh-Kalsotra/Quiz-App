import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizQuestions: [],
  },
  reducers: {
    changeQuiz: (state, action) => {
      state.quizQuestions = action.payload;
    },
  },
});

export const { changeQuiz } = quizSlice.actions;

export default quizSlice.reducer;
