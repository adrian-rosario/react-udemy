import React /* , { useContext } */ from "react";
// - removing Redux import { useSelector } from "react-redux";
import ProductItem from "../components/Products/ProductItem";
import "./Products.css";
// - using context
// import { ProductsContext } from "../context/product-context";

// - using custom hook
import { useHookStore } from "../hooks/store";

const Products = (props) => {
  // const productList = useSelector((state) => state.shop.products);

  // - using context
  // const theProductsList = useContext(ProductsContext).products;

  // - custom hook
  const state = useHookStore()[0];

  return (
    <ul className='products-list'>
      {state.products.map(
        (
          prod // - theProductsList.map
        ) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
            isFav={prod.isFavorite}
          />
        )
      )}
    </ul>
  );
};

export default Products;
