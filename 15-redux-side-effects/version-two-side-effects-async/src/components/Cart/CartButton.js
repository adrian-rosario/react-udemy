import classes from "./CartButton.module.css";
// -
import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../../store/display-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const handleCartToggle = () => {
    dispatch(displayActions.toggleCartDisplay());
  };

  const cartItemsFromState = useSelector((state) => state.cartStore.totalItems);

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsFromState}</span>
    </button>
  );
};

export default CartButton;
