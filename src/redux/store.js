import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";

import surveyReducer from "./slices/SurveySlice";
import todoReducer from "./slices/todoSlice";

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

const persistRootConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistTodoConfig = {
  key: "data",
  storage,
  whitelist: ["todos"],
};

const store = configureStore({
  reducer: persistCombineReducers(persistRootConfig, {
    survey: surveyReducer,
    todoState: persistReducer(persistTodoConfig, todoReducer),
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
});

export const persistor = persistStore(store);

export default store;
