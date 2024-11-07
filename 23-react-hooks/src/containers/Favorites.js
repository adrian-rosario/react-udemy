import React /* , { useContext } */ from "react";
// import { useSelector } from 'react-redux';
import FavoriteItem from "../components/Favorites/FavoriteItem";
import "./Products.css";
// -
// import { ProductsContext } from "../context/product-context";

import { useHookStore } from "../hooks/store";

const Favorites = (props) => {
  // const favoriteProducts = useSelector(state =>
  //   state.shop.products.filter(p => p.isFavorite)
  // );

  // const theContext = useContext(ProductsContext).products.filter(
  //   (item) => item.isFavorite
  // );

  const state = useHookStore()[0];
  const favoriteProducts = state.products.filter((item) => item.isFavorite);

  let content = <p className='placeholder'>Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className='products-list'>
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
