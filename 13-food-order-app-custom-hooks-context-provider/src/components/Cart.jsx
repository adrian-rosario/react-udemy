import { useContext } from "react";
import Dialog from "./Dialog";
import ShoppingCartContext from "../store/CartContext";
import { currencyFormatter } from "../util/helpers";
import Button from "./Button";
import CheckoutContext from "../store/CheckoutContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = useContext(ShoppingCartContext);
  const checkoutContext = useContext(CheckoutContext);

  const cartPriceTotal = cartContext.cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0 // initial value
  );

  function handleCloseCart() {
    checkoutContext.hideCart();
  }

  function handleShowCheckout() {
    checkoutContext.showCheckout();
  }

  // console.log("?\n" + cartPriceTotal);
  // console.log("cart items:\n" + JSON.stringify(cartContext.cartItems));
  return (
    <>
      <Dialog
        classNames='cart'
        open={checkoutContext.progress === "cart"}
        // - if we are in the checkout dialog return null (do nothing)
        // or else the checkout view is not displayed
        onClose={checkoutContext.progress === "cart" ? handleCloseCart : null}
      >
        <h2>Your Items</h2>
        <ul>
          {cartContext.cartItems.map((item, index) => {
            return (
              <CartItem
                key={index}
                item={item}
                onIncrement={() => cartContext.addItemToCart(item)}
                onDecrement={() => cartContext.removeItemFromCart(item.id)}
              />
            );
          })}
        </ul>
        <p>Total: {currencyFormatter.format(cartPriceTotal)}</p>
        <div className='actions'>
          <Button textButton onClick={handleCloseCart}>
            Close
          </Button>
          {cartContext.cartItems.length > 0 && (
            <Button onClick={handleShowCheckout}>Checkout</Button>
          )}
        </div>
      </Dialog>
    </>
  );
}
