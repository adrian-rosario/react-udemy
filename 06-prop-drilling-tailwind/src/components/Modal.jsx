import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal(
  { message, children, buttonText = "Close" },
  ref
) {
  const dialogRef = useRef();

  const dialogCss = "backdrop:bg-stone-900/90 p-4 rounded-md shadow-md";
  const formCss = "mt-4 text-right";

  // expose properties/methods outside this component
  useImperativeHandle(ref, () => {
    return {
      open() {
        // showModal() is a built in dialog method
        // invisible by default
        dialogRef.current.showModal();
      },
    };
  });

  // using createPortal so we can specify where in the
  // DOM the dialog is added
  return createPortal(
    <dialog ref={dialogRef} className={dialogCss}>
      <div>
        <div>{children}</div>
        <div>{message}</div>
      </div>
      <form method='dialog' className={formCss}>
        <Button>{buttonText}</Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default Modal;

Modal.propTypes = {
  message: PropTypes.any,
  children: PropTypes.any,
  buttonText: PropTypes.any,
};
