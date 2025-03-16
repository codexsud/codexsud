import { createSlice } from "@reduxjs/toolkit";
import exercises from "../data";
import _ from "lodash";

const initialState = {
  solved: [],
  currentQuestion: 1,
  completedQuestion: 0,
  currentSet: [],
  isCompleted: false,
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    updateSolved: (state, action) => {
      const question = action.payload;
      const solved = state.solved;
      if (!solved.includes(question)) {
        solved.push(question);
      }
      state.solved = solved;
    },
    resetSolved: (state) => {
      state.solved = [];
    },
    updateCompletedQuestion: (state, action) => {
      const question = action.payload;
      state.completedQuestion = question;
      if (question === state.currentSet.length) {
        state.isCompleted = true;
      }
    },
    resetCompletedQuestion: (state) => {
      state.completedQuestion = 0;
    },
    updateCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    resetCurrentQuestion: (state) => {
      state.currentQuestion = 1;
    },
    updateCurrentSet: (state, action) => {
      const id = action.payload;
      const set = exercises?.filter((item) => Number(item.id) === Number(id));
      if (set && Array.isArray(set) && set.length > 0) {
        state.currentSet = _.first(set)?.tasks;
      }
    },
    resetCurrentSet: (state) => {
      state.currentSet = [];
    },
    resetState: (state) => {
      state.currentQuestion = 1;
      state.completedQuestion = 0;
      state.isCompleted = false;
    },
  },
});

export const {
  resetCompletedQuestion,
  updateCompletedQuestion,
  updateCurrentQuestion,
  resetCurrentQuestion,
  resetSolved,
  updateSolved,
  resetCurrentSet,
  updateCurrentSet,
  resetState,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
