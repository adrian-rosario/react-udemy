import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// -
import { useSelector, useDispatch } from "react-redux";
// import { FIREBASE_URL } from "./util/constants";
import { useEffect } from "react";
// import { displayActions } from "./store/display-slice";
import Notification from "./components/UI/Notification";
import { sendCartOrder, loadCartFromDb } from "./store/cart-actions";
import { cartActions } from "./store/cart-slice";

let initialRun = true;

function App() {
  const cartDisplayFromState = useSelector(
    (state) => state.displayStore.cartDisplay
  );

  // const cartItemsFromState = useSelector((state) => state.cartStore.cartItems);

  const dispatch = useDispatch();

  const notificationsFromState = useSelector(
    (state) => state.displayStore.notification
  );

  const entireState = useSelector((state) => state.cartStore);

  // effect for loading data
  useEffect(() => {
    dispatch(loadCartFromDb());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    // dispatch(
    // moved to custom action creator in cart-slice.js
    //   displayActions.showNotification({
    //     status: "pending",
    //     title: "Sending",
    //     message: "Transmitting cart data",
    //   })
    // );
    // moved to custom action creator in cart-slice.js
    // const response = await fetch(FIREBASE_URL + "cart.json", {
    //   method: "PUT",
    //   body: JSON.stringify(cartItemsFromState),
    // });
    // if (!response.ok) {
    //   throw new Error("There was a problem");
    // }
    // dispatch(
    //   displayActions.showNotification({
    //     status: "success",
    //     title: "Data sent",
    //     message: "All OK.",
    //   })
    // );
    // };

    // so inital load doesn't send any data
    if (initialRun) {
      initialRun = false;
      return;
    }

    // console.log("the order:\n" + JSON.stringify(cartItemsFromState));
    console.log("state check:\n" + JSON.stringify(entireState));

    if (entireState.changed) {
      dispatch(sendCartOrder(entireState));
    }

    // sendCartData().catch((error) => {
    //   dispatch(
    //     displayActions.showNotification({
    //       status: "error",
    //       title: "There was an error",
    //       message: "Data was not sent. " + error.message,
    //     })
    //   );
    // });
  }, [entireState, dispatch]);

  return (
    <>
      {notificationsFromState && (
        <Notification
          status={notificationsFromState.status}
          title={notificationsFromState.title}
          message={notificationsFromState.message}
        />
      )}

      <Layout>
        {cartDisplayFromState && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
