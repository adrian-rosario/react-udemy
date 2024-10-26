import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "./display-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    displayStore: displaySlice,
    cartStore: cartSlice,
  },
});

export const displayActions = displaySlice;

export default store;
