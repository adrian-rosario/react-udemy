import { ShoppingCartContext } from "../store/shoppingCart.context.jsx";
import { useContext } from "react";

export default function Product({
  id,
  image,
  title,
  price,
  description,
  // context added
  // onAddToCart,
}) {
  const { addItemToCart } = useContext(ShoppingCartContext);

  return (
    <article className='product'>
      <img src={image} alt={title} />
      <div className='product-content'>
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
