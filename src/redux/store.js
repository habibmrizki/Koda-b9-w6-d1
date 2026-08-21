import { configureStore } from "@reduxjs/toolkit";

import surveyReducer from "./slices/SurveySlice";

const store = configureStore({
  reducer: {
    survey: surveyReducer,
  },
});

export default store;
