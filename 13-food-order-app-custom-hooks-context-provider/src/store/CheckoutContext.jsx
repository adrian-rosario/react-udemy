import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CheckoutContext = createContext({
  progress: "", // cart, checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function CheckoutContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <CheckoutContext.Provider value={userProgressContext}>
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutContext;

CheckoutContextProvider.propTypes = {
  children: PropTypes.any,
};
