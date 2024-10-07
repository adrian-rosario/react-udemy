import PropTypes from "prop-types";
import { useState, useRef } from "react";
import GameResultModal from "./GameResultModal";

TimerChallenge.propTypes = {
  title: PropTypes.string,
  targetTime: PropTypes.number,
};

// broken exmple, w/o using ref
// you can use refs not only to connect to HTML elements,
// you can reference/manage any kind of value
// let theTimer;

export default function TimerChallenge({ title, targetTime }) {
  // if you have a value, that must be managed, but isn't really a state,
  // doesn't impact UI directly, and we don't want it reset when the component is re-executed
  // it's a great use case for a useRef()
  const theTimer = useRef();

  const dialog = useRef();

  // const [getTimerStarted, setTimerStarted] = useState(false);
  // const [getTimerExpired, setTimerExpired] = useState(false);

  const [getRemainingTime, setRemainingTime] = useState(targetTime * 1000);
  const timerActive =
    getRemainingTime > 0 && getRemainingTime < targetTime * 1000;

  // time is up check
  if (getRemainingTime <= 0) {
    // be aware of potential danger of infinite loop, the 'if' condition is a guard
    clearInterval(theTimer.current);
    setRemainingTime(targetTime * 1000);
    dialog.current.open();
  }

  function handleSetTimer() {
    // console.log("handle start");
    // setTimerStarted(true);

    theTimer.current = setInterval(() => {
      setRemainingTime(
        (previousTimeRemainingState) => previousTimeRemainingState - 10
      );
    }, 10);
  }

  function handleStopTimer() {
    // console.log("handle stop");
    dialog.current.open();
    clearInterval(theTimer.current);
  }

  function handleResetTimer() {
    setRemainingTime(targetTime * 1000);
  }

  return (
    <>
      {
        <GameResultModal
          gameTargetTime={targetTime}
          ref={dialog}
          gameRemainingTime={getRemainingTime}
          onReset={handleResetTimer}
        />
      }

      <section className='timerChallenge'>
        <h3>{title}</h3>

        {/* {getTimer && <p>Sorry, you lost</p>} */}

        <p>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>

        <div>
          <button onClick={timerActive ? handleStopTimer : handleSetTimer}>
            {timerActive ? "Stop Timer" : "Start Timer"}
          </button>
        </div>

        <p className=''>{timerActive ? "Timer Running!" : "Timer inactive"}</p>
      </section>
    </>
  );
}
