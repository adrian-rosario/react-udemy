import { createSlice } from "@reduxjs/toolkit";

const initialDisplayState = {
  cartDisplay: false,
  notification: null,
};

const displaySlice = createSlice({
  name: "displaySlice",
  initialState: initialDisplayState,
  reducers: {
    toggleCartDisplay(state) {
      // console.log("display slice, toggle called");
      state.cartDisplay = !state.cartDisplay;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const displayActions = displaySlice.actions;
export default displaySlice.reducer;
