import React /* , { useContext } */ from "react";
import ReactDOM from "react-dom";
// - removing Redux
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
// import productReducer from './store/reducers/products';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// - using context, after removing Redux
// import ProductsProvider from "./context/product-context";
// - using custom hook
import configureStore from "./hooks/productsStore";

configureStore();

// - removing Redux
// const rootReducer = combineReducers({
//   shop: productReducer
// });
// const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

/*
// before custom hook
  <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsProvider>,
*/

/*
// - before Redux removed
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
*/
