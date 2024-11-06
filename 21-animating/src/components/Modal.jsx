import { createPortal } from "react-dom";
// -
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className='backdrop' onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: -50 },
          display: { opacity: 1, y: 0 },
        }}
        initial='hidden' // example using a variant key
        open
        className='modal' // example using a variant key
        animate='display'
        exit={{ opacity: 0, y: 50 }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}

/*
variants={{
  hidden: {opacity: 0, y: -50},
  visible: {opacity: 1, y: 0}
}}
*/
