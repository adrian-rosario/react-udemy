// - redux toolkit
import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counterSlice",
  initialState: initialCounterState,
  reducers: {
    // - map of all reducers this slice needs
    // - they will receive the current state, we will dispatch actions which will target these reducers
    // redux toolkit, internally, will uses Immer (sp?) which will detect & clone the existing state,
    // and override only the state we're editing in an immutable way
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter =
        state.counter + action.payload /* using parameter value */;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
