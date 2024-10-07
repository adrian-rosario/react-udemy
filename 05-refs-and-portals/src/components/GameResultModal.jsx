import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useRef } from "react";

// features and functions that allow React to interract w/ DOM
import { createPortal } from "react-dom";

// in order to get access to the built in backdrop
// we have to trigger the dialog programatically
// refs can help us with this
// to do this, we have to forward refs to our custom component
// thus, we need forwardRef
const GameResultModal = forwardRef(function GameResultModal(
  { gameTargetTime, gameRemainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const formattedRemainingTime = (gameRemainingTime / 1000).toFixed(2);
  const score = Math.round(
    (1 - gameRemainingTime / (gameTargetTime * 1000)) * 100
  );

  const userLost = score === 0;

  // expose properties/methods outside this component
  useImperativeHandle(ref, () => {
    return {
      open() {
        // showModal() is a built in dialog method
        // invisible by default
        dialog.current.showModal();
      },
    };
  });

  // using createPortal so we can specify where in the
  // DOM the dialog is added
  return createPortal(
    <dialog ref={dialog} onClose={onReset}>
      {userLost && <h3>Sorry, you lost. Score: {score}</h3>}
      {!userLost && <h3>You won! Score: {score}</h3>}
      <p>Your target time: {gameTargetTime} seconds. </p>
      <p>
        The timer ended with <strong>{formattedRemainingTime}</strong> seconds
        left.
      </p>

      {/* a form with a method of dialog, inside a <dialog> -- this is built into HTML, with a button, by default will close the dialog */}

      <form method='dialog' onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );

  // return (
  //   <dialog ref={dialog} onClose={onReset}>
  //     {userLost && <h3>Sorry, you lost. Score: {score}</h3>}
  //     {!userLost && <h3>You won! Score: {score}</h3>}
  //     <p>Your target time: {gameTargetTime} seconds. </p>
  //     <p>
  //       The timer ended with <strong>{formattedRemainingTime}</strong> seconds
  //       left.
  //     </p>

  //     {/* a form with a method of dialog, inside a <dialog> -- this is built into HTML, with a button, by default will close the dialog */}

  //     <form method='dialog' onSubmit={onReset}>
  //       <button>Close</button>
  //     </form>
  //   </dialog>
  // );
});

GameResultModal.propTypes = {
  gameTargetTime: PropTypes.any,
  gameRemainingTime: PropTypes.any,
  onReset: PropTypes.any,
};

export default GameResultModal;
