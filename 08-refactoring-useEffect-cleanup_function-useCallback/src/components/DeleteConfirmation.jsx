import { useEffect } from "react";
// import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // - this works, but it's not ideal, bc setInterval is running every ten milliseconds
  // and the state is updated -- which causes the component to re-run every time
  // - move to a component
  const TIMER = 3000;
  // const [getRemainingTime, setRemainingTime] = useState(TIMER);
  // useEffect(() => {
  //   const theInterval = setInterval(() => {
  //     setRemainingTime((previousValue) => previousValue - 10);
  //   }, 10); // every ten milliseconds

  //   // - include cleanup function or setInterval will continue
  //   return () => {
  //     clearInterval(theInterval);
  //   };
  // }, []);

  // -
  useEffect(() => {
    // - dismiss after time
    console.log("DeleteConfirmation, useEffect");
    const theTimer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // cleanup function, before this component dismounts/removed from the DOM
    return () => {
      console.log("timer clear.");
      clearTimeout(theTimer);
    };
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button onClick={onCancel} className='button-text'>
          No
        </button>
        <button onClick={onConfirm} className='button'>
          Yes
        </button>
      </div>

      {/* // - adding progress bar */}
      {/* <progress value={getRemainingTime} max={TIMER} /> */}
      <ProgressIndicator maxTime={TIMER} />
    </div>
  );
}
