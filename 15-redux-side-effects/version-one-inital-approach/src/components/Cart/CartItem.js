import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, totalPrice, price, id, description } = props.item;

  const dispatch = useDispatch();

  const handleIncrement = (event) => {
    event.preventDefault();
    // console.log("dispatch increment... " + id);
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
        quantity,
      })
    );
  };

  const handleDecrement = (event) => {
    event.preventDefault();
    // console.log("dispatch decrement...");
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
