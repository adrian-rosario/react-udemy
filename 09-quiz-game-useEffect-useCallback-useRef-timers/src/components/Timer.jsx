import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Timer({ timerLength, onTimeout, mode }) {
  const [getRemainingTime, setRemainingTime] = useState(timerLength);

  useEffect(() => {
    // console.log("set timeout");

    const theTimer = setTimeout(onTimeout, timerLength);

    // clean up
    return () => {
      clearTimeout(theTimer);
    };
  }, [timerLength, onTimeout]);

  useEffect(() => {
    const theInterval = setInterval(() => {
      // console.log("set interval!");

      setRemainingTime((prevState) => prevState - 100);
    }, 100);

    // clean up
    return () => {
      clearInterval(theInterval);
    };
  }, []);

  return (
    <progress max={timerLength} value={getRemainingTime} className={mode} />
  );
}

Timer.propTypes = {
  timerLength: PropTypes.any,
  onTimeout: PropTypes.any,
  mode: PropTypes.any,
};
