import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import exerciseReducer from "../features/exerciseSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["app/updateDb"],
        ignoredActionPaths: ["payload.db"],
        ignoredPaths: ["app.db"],
      },
    }),
  reducer: {
    app: appReducer,
    exercise: exerciseReducer,
  },
});
