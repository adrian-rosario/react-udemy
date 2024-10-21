import Dialog from "./Dialog";
import { useContext } from "react";
import ShoppingCartContext from "../store/CartContext";
import { currencyFormatter } from "../util/helpers";
import Input from "./Input";
import Button from "./Button";
import CheckoutContext from "../store/CheckoutContext";
import * as invar from "../util/constants";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

// - avoid infinite loop, define it outside the component
const requestConfiguration = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(ShoppingCartContext);

  const { error, isLoading, data, sendRequest, clearData } = useHttp(
    invar.POST_ORDER,
    requestConfiguration
  );

  const cartPriceTotal = cartContext.cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0 // initial value
  );

  const checkoutContext = useContext(CheckoutContext);

  function handleCloseDialog() {
    checkoutContext.hideCheckout();
  }

  function handleCompleteTransaction() {
    checkoutContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log("? " + cartContext.cartItems);
    const customerFormDataValues = new FormData(event.target);
    const customerFormValues = Object.fromEntries(
      customerFormDataValues.entries()
    );

    // - from custom hook
    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.cartItems,
          customer: customerFormValues,
        },
      })
    );

    // - refactored w/ useHttp() custom hook
    // console.log(JSON.stringify(customerFormValues));
    // fetch(invar.POST_ORDER, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartContext.cartItems,
    //       customer: customerFormValues,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <div>
        <Button type='button' textButton onClick={handleCloseDialog}>
          Close
        </Button>
      </div>
      <div>
        <Button>Complete Order</Button>
      </div>
    </>
  );

  if (isLoading) {
    actions = <div>Sending order</div>;
  }

  if (data && !error) {
    return (
      <Dialog
        open={checkoutContext.progress === "checkout"}
        onClose={handleCompleteTransaction}
        classNames='orderSumitted'
      >
        <h2>Order sent successfully.</h2>
        <p>Details will follow shortly.</p>
        <div>
          <button onClick={handleCompleteTransaction}>OK</button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={checkoutContext.progress === "checkout"}
      onClose={handleCloseDialog}
    >
      <form onSubmit={handleFormSubmit} className='checkoutForm'>
        <h2>Order Checkout</h2>

        <div className='total'>
          <span className='b'>Total:</span>&nbsp;
          {currencyFormatter.format(cartPriceTotal)}
        </div>

        <div>
          <Input textLabel='Name:' id='name' />
        </div>

        <div>
          <Input textLabel='Email:' id='email' type='email' />
        </div>

        <div>
          <Input textLabel='Address:' id='street' />
        </div>

        <div>
          <div>
            <Input textLabel='City:' id='city' />
          </div>
          {/* <div>
              <Input textLabel='State:' id='state' />
            </div> */}
          <div>
            <Input textLabel='Zip:' id='postal-code' />
          </div>
        </div>

        {error && <Error title="We're sorry." message={error} />}

        <div className='actions'>{actions}</div>
      </form>
    </Dialog>
  );
}
