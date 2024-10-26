import { displayActions } from "./display-slice";
import { FIREBASE_URL } from "../util/constants";
import { cartActions } from "./cart-slice";

export const sendCartOrder = (cartData) => {
  return async (dispatch) => {
    dispatch(
      displayActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Transmitting cart data",
      })
    );

    // console.log("cart data to send:\n" + JSON.stringify(cartData));

    const sendRequest = async () => {
      console.log("cart-actions, cartData\n" + JSON.stringify(cartData));
      const response = await fetch(FIREBASE_URL + "cart.json", {
        method: "PUT",
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error("There was a problem");
      }
    };

    try {
      await sendRequest();
      dispatch(
        displayActions.showNotification({
          status: "success",
          title: "Data sent",
          message: "All OK.",
        })
      );
    } catch (error) {
      dispatch(
        displayActions.showNotification({
          status: "error",
          title: "There was an error",
          message: "Data was not sent. " + error.message,
        })
      );
    }
  };
};

export const loadCartFromDb = () => {
  console.log("load cart data...");
  return async (dispatch) => {
    const fetchData = async () => {
      const requestResponse = await fetch(FIREBASE_URL + "cart.json");

      if (!requestResponse.ok) {
        throw new Error("There was a problem loading data");
      }

      const theData = await requestResponse.json();

      return theData;
    };

    try {
      const theCartData = await fetchData();
      // console.log("retrieved cart data\n" + theCartData);
      dispatch(
        cartActions.replaceCart({
          cartItems: theCartData.cartItems || [],
          totalItems: theCartData.totalItems,
        })
      );
      // -
    } catch (error) {
      dispatch(
        displayActions.showNotification({
          status: "error",
          title: "There was an error",
          message: "Cart data was not retrieved successfully. " + error.message,
        })
      );
    }
  };
};
