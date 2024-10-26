import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItemsFromState = useSelector((state) => state.cartStore.cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItemsFromState.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={{
                title: item.title,
                id: item.id,
                price: item.price,
                description: item.description,
                totalPrice: item.price * item.quantity,
                quantity: item.quantity,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;

/* 
        <CartItem
          item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
        />
*/
