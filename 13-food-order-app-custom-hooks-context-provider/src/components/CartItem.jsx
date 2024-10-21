import PropTypes from "prop-types";
import { currencyFormatter } from "../util/helpers";

export default function CartItem({ item, onIncrement, onDecrement }) {
  return (
    <li>
      <div>
        {item.name}, {item.quantity} x {currencyFormatter.format(item.price)}
      </div>

      <div className='controls'>
        <span>Quantity</span>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.any,
  onIncrement: PropTypes.any,
  onDecrement: PropTypes.any,
};
