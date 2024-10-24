// import { createStore } from "redux";
import counterSlice from "./counter-slice";
import authenticationSlice from "./authentication-slice";

// - redux toolkit, refactored
import { /* createSlice, */ configureStore } from "@reduxjs/toolkit";
// import { counterActions } from "./counter-slice";
// import { authenticationActions } from "./authentication-slice";

// - refactored using createSlice() / reduxjs/toolkit
/*
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
};
*/

// const store = createStore(counterReducer);

const store = configureStore({
  // -  set reducer property
  reducer: {
    counterStore: counterSlice /* counterSlice.reducer */,
    authenticationStore: authenticationSlice /* authenticationSlice.reducer */,
  },
  // can be single global reducer, or an object w/ different reducer functions (map) that will be merged
});

export const counterActions = counterSlice; /* counterSlice.actions*/
export const authenticationActions =
  authenticationSlice; /*authenticationSlice.actions*/

export default store;
