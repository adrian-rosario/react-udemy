import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

// context added
// import { ShoppingCartContext } from "../store/shoppingCart.context.jsx";

const CartModal = forwardRef(function Modal(
  { /* context added cartItems, onUpdateCartItemQuantity, */ title, actions },
  ref
) {
  const dialog = useRef();

  // const { items, updateItemQuantity } = useContext(ShoppingCartContext);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id='modal' ref={dialog}>
      <h2>{title}</h2>

      <Cart />
      {/* context added <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} /> */}

      <form method='dialog' id='modal-actions'>
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
