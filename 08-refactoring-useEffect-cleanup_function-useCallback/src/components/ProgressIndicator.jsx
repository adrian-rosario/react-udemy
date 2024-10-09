import { useEffect } from "react";
import { useState } from "react";

export default function ProgressIndicator({ maxTime }) {
  const [getRemainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    const theInterval = setInterval(() => {
      setRemainingTime((previousValue) => previousValue - 10);
    }, 10); // every ten milliseconds

    // - include cleanup function or setInterval will continue
    return () => {
      clearInterval(theInterval);
    };
  }, []);

  return <progress value={getRemainingTime} max={maxTime} />;
}
