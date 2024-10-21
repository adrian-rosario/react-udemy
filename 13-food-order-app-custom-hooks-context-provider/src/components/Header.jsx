import { useContext } from "react";
import * as invar from "../util/constants.js";
import Button from "./Button.jsx";
import ShoppingCartContext from "../store/CartContext.jsx";
import CheckoutContext from "../store/CheckoutContext.jsx";

export default function Header() {
  const cartContext = useContext(ShoppingCartContext);
  const checkoutContext = useContext(CheckoutContext);

  const totalCartItems = cartContext.cartItems.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0 // - starting value
  );

  function handleShowCart() {
    checkoutContext.showCart();
  }

  return (
    <header>
      <div className='mast'>
        <div className='logo'>
          <h1>{invar.APP_NAME}</h1>
        </div>

        <div className='orders'>
          <nav>
            <Button textButton onClick={handleShowCart}>
              Cart: {totalCartItems}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
