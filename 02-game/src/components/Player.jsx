import { useState } from "react";
import PropTypes from "prop-types";

Player.propTypes = {
  initialName: PropTypes.any,
  symbol: PropTypes.any,
  activePlayer: PropTypes.any,
  onChangeName: PropTypes.any,
};

export default function Player({
  initialName,
  symbol,
  activePlayer,
  onChangeName,
}) {
  const [getPlayerIsEditing, setPlayerIsEditing] = useState(false);
  const [getPlayerName, setPlayerName] = useState(initialName);

  function handleClick() {
    setPlayerIsEditing(!getPlayerIsEditing);

    if (getPlayerIsEditing) onChangeName(symbol, getPlayerName);
  }

  function handleInputChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <>
      <li className={activePlayer ? "highlightPlayerTurn" : undefined}>
        <div>
          {getPlayerIsEditing ? (
            <span>
              <input
                type='text'
                value={getPlayerName}
                onChange={handleInputChange}
              />
            </span>
          ) : (
            <span>{getPlayerName}</span>
          )}
          <span className='symbol'>{symbol}</span>
        </div>
        <button onClick={handleClick}>
          {getPlayerIsEditing ? "Save" : "Edit"}
        </button>
      </li>
    </>
  );
}
