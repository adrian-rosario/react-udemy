import {
  /* forwardRef,  useImperativeHandle, */ useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [
    open,
    /* prop, state, context values, or functions used in the effect function, -- any values that cause the component function to execute again  */
  ]);

  return createPortal(
    <dialog className='modal' ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

// - original
/*
const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});
*/
export default Modal;
