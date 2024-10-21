// - spread data to all components that need it in a
// centralized & reusable way
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const ShoppingCartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // - update state, add meal item
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.cartItems]; // - copy of old array

    // - we only want items added once, and we will use a quantity value that can be altered
    if (existingCartItemIndex > -1) {
      // update quantity
      const existingItem = state.cartItems[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // - add incoming item
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, cartItems: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // - remove item from state
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    // - check quantity, if > 1, reduce the quantity
    // if it is equal to one, remove it from the array
    const existingCartItem = state.cartItems[existingCartItemIndex];
    const updatedItems = [...state.cartItems];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, cartItems: updatedItems };
  }

  // - purge cart, ie. transaction completed
  if (action.type === "CLEAR_CART") {
    return { ...state, cartItems: [] };
  }

  return state;
}

export function ShoppingCartContextProvider({ children }) {
  // - useReducer() is simpler for managing complex state
  const [cart, dispatchAction] = useReducer(cartReducer, { cartItems: [] }); // - second arg is initial state value (first render)

  function addItemToCart(item) {
    dispatchAction({ type: "ADD_ITEM", item });
  }

  function removeItemFromCart(id) {
    dispatchAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    cartItems: cart.cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  // console.log("cart context: " + JSON.stringify(cartContext));

  return (
    <ShoppingCartContext.Provider value={cartContext}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

ShoppingCartContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ShoppingCartContext;
