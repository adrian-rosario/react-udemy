import PropTypes from "prop-types";
import * as invar from "../util/constants";
import * as helper from "../util/helpers";
import Button from "./Button";
import { useContext } from "react";
import ShoppingCartContext from "../store/CartContext";

export default function BuffetItem({ item }) {
  const theCartContext = useContext(ShoppingCartContext);
  const theImage = invar.IMAGES + item.image;

  function handleAddItemToCart() {
    theCartContext.addItemToCart(item);
  }

  return (
    <li>
      <article>
        <div>
          <h3>{item.name}</h3>
        </div>

        <div>
          <img src={theImage} alt={item.name} />
        </div>

        <div>
          <p className='itemDescription'>{item.description}</p>
          <p className='itemPrice'>
            {helper.currencyFormatter.format(item.price)}
          </p>
        </div>

        <div>
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}

BuffetItem.propTypes = {
  item: PropTypes.any,
};
