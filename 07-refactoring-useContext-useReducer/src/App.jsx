// CartContextProvider added
// import { useState } from "react";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
// CartContextProvider added
import { DUMMY_PRODUCTS } from "./dummy-products.js";
// context added
// import { ShoppingCartContext } from "./store/shoppingCart.context.jsx";
import Product from "./components/Product";
import CartContextProvider from "./store/shoppingCart.context.jsx";

function App() {
  // CartContextProvider added, logic moved there

  return (
    <>
      <CartContextProvider>
        <Header />
        <Shop>
          {/* hoisted from Shop */}
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}

          {/* <Header
            cart={shoppingCart}
            onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
          /> */}

          {/* {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} onAddToCart={handleAddItemToCart} />
            </li>
          ))} */}
        </Shop>
      </CartContextProvider>
    </>
  );
}

export default App;
