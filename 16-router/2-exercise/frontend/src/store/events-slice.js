import { createSlice } from "@reduxjs/toolkit";

const initialEventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState: initialEventsState,
  reducers: {
    replaceEvents(state, action) {
      state.events = action.payload.events;
      // console.log("🍕 state check\n" + JSON.stringify(state.events));
    },
  },
});

export const eventsActions = eventsSlice.actions;
export default eventsSlice.reducer;
