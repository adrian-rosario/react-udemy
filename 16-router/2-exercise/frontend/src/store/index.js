import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";

const store = configureStore({
  reducer: {
    eventsStore: eventsSlice,
  },
});

export const eventsActions = eventsSlice;

export default store;
