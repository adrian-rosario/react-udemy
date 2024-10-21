import "./App.css";
import Buffet from "./components/Buffet";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ShoppingCartContextProvider } from "./store/CartContext";
import { CheckoutContextProvider } from "./store/CheckoutContext";

function App() {
  return (
    <>
      <CheckoutContextProvider>
        <ShoppingCartContextProvider>
          <Header />
          <Buffet />
          <Footer />
          <Cart />
          <Checkout />
        </ShoppingCartContextProvider>
      </CheckoutContextProvider>
    </>
  );
}

export default App;
