import { useState } from "react";

export default function Welcome() {
  const [theString, setTheString] = useState("The initial text value");

  const handleButtonClick = () => {
    setTheString("New Text Value");
  };

  return (
    <div>
      <h1>Welcome to unit tests</h1>
      <p>This is a simple component to test.</p>
      <div>
        <button onClick={handleButtonClick}>Change Text</button>
      </div>
      <div>{theString}</div>
    </div>
  );
}
