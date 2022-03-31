import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import configReducer from "../features/config/configSlice";

const store = configureStore({
  reducer: {
    config: configReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
