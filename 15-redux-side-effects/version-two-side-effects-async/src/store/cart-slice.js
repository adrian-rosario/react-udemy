import { createSlice } from "@reduxjs/toolkit";
// import { displayActions } from "./display-slice";
// import { FIREBASE_URL } from "../util/constants";

const initialCartState = {
  cartItems: [],
  totalItems: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      // console.log("cart slice, add item" + JSON.stringify(action.payload));
      const theNewItem = action.payload;
      // check if item is new, add it. if already part of the array,
      // update quantity
      const theExistingItem = state.cartItems.find(
        (eachItem) => eachItem.id === theNewItem.id
      );

      state.changed = true;

      // add as a new item
      if (!theExistingItem) {
        state.cartItems.push({
          id: theNewItem.id,
          title: theNewItem.title,
          price: theNewItem.price,
          description: theNewItem.description,
          quantity: 1,
          totalPrice: theNewItem.price,
        }); // w/o redux tookit this would b bad
      } else {
        // update quantity
        // console.log("update quantity\n" + JSON.stringify(theExistingItem));
        theExistingItem.quantity++;
        theExistingItem.totalPrice =
          theExistingItem.totalPrice + theNewItem.price;
      }
      state.totalItems++;
    },
    removeItemFromCart(state, action) {
      // console.log("cart slice, remove item " + JSON.stringify(action.payload));
      const id = action.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);

      state.changed = true;

      if (existingItem.quantity === 1) {
        // - keep the items that do not match the current one,
        // last item in quantity, we want it completely removed
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        // console.log("update quantity on\n" + JSON.stringify(existingItem));
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalItems--;
    },
    replaceCart(state, action) {
      // console.log("replaceCart\n" + JSON.stringify(action.payload));
      state.totalItems = action.payload.totalItems;
      state.cartItems = action.payload.cartItems;
    },
  },
});

// - custom action creator, moved to it's own file, cart-actions.j
// export const sendCartOrder = (cartData) => {
//   return async (dispatch) => {
//     dispatch(
//       displayActions.showNotification({
//         status: "pending",
//         title: "Sending",
//         message: "Transmitting cart data",
//       })
//     );

//     // console.log("cart data to send:\n" + JSON.stringify(cartData));

//     const sendRequest = async () => {
//       const response = await fetch(FIREBASE_URL + "cart.json", {
//         method: "PUT",
//         body: JSON.stringify(cartData),
//       });

//       if (!response.ok) {
//         throw new Error("There was a problem");
//       }
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         displayActions.showNotification({
//           status: "success",
//           title: "Data sent",
//           message: "All OK.",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         displayActions.showNotification({
//           status: "error",
//           title: "There was an error",
//           message: "Data was not sent. " + error.message,
//         })
//       );
//     }
//   };
// };

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
