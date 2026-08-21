import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  surveys: [],
};

const surveySlice = createSlice({
  name: "Survey",
  initialState,
  reducers: {
    addSurvey: (state, action) => {
      state.surveys.push({ id: Date.now(), ...action.payload });
    },
    removeSurvey: (state, action) => {
      state.surveys = state.surveys.filter(
        (survey) => survey.id !== action.payload,
      );
    },
  },
});

export const { addSurvey, removeSurvey } = surveySlice.actions;

export default surveySlice.reducer;
