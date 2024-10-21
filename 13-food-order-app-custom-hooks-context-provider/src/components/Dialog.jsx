import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Dialog({ children, open, classNames = "", onClose }) {
  const theDialog = useRef();

  useEffect(() => {
    const theModal = theDialog.current;
    if (open) {
      theModal.showModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => theDialog.current.close(); // whenever this effect will run again
  }, [open]);

  return createPortal(
    <dialog ref={theDialog} className={classNames} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
