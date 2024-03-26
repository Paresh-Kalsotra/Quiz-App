import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topicName: "",
  },
  reducers: {
    changeTopic: (state, action) => {
      state.topicName = action.payload;
    },
  },
});

export const { changeTopic } = topicSlice.actions;

export default topicSlice.reducer;
