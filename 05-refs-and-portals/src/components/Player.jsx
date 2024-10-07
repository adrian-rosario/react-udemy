import { useState, useRef } from "react";

export default function Player() {
  const [getPlayerName, setPlayerName] = useState(null);

  const playerNameInput = useRef();

  function handleButtonClick() {
    setPlayerName(playerNameInput.current.value);
    playerNameInput.current.value = "";
  }

  // example w/o using Refs
  // const [getFormSubmitted, setFormSubmitted] = useState(false);

  // function handleNameChange(event) {
  //   const theFormFieldValue = event.target.value;
  //   setPlayerName(theFormFieldValue);
  //   setFormSubmitted(false);
  // }

  // function handleButtonClick() {
  //   setFormSubmitted(true);
  // }
  //

  // - whenever a ref changes the component's constructor doesn't re-execute.
  // - when you update state, the component's constructor IS exectured

  // - state should be used for values that are directly reflected in the UI, not for
  // values used behind the scenes that have no direct UI impact

  // - refs should be used to gain direct DOM element access, great for
  // reading values or accessing certain browser APIs

  return (
    <section className='player'>
      <h2>
        Welcome,&nbsp;
        {getPlayerName ?? "game player"}.
      </h2>
      <div>
        <label htmlFor='nameInput'></label>
        <input
          ref={playerNameInput}
          type='text'
          id='nameInput'
          // example w/o using Refs
          // onChange={handleNameChange}
          // value={getPlayerName}
          placeholder='enter your name'
        />
      </div>
      <div>
        <button onClick={handleButtonClick}>Set Name</button>
      </div>
    </section>
  );
}
