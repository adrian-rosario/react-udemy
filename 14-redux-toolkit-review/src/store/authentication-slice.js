import { createSlice } from "@reduxjs/toolkit";
const initialAuthenticationState = { loggedIn: false };
const authenticationSlice = createSlice({
  name: "authenticationState",
  initialState: initialAuthenticationState,
  reducers: {
    userLogin(state) {
      // console.log("setting user state to true");
      state.loggedIn = true; // - just for the example
    },
    userLogOut(state) {
      // console.log("setting user state to false");
      state.loggedIn = false;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
