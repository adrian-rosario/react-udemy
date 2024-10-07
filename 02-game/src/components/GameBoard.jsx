// import { useState } from "react";
import PropTypes from "prop-types";

// const gameBoardSetup = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

GameBoard.propTypes = {
  onPlayerTurn: PropTypes.any,
  activePlayer: PropTypes.string,
  turns: PropTypes.array,
  gameBoardData: PropTypes.array,
};

export default function GameBoard({
  onPlayerTurn,
  gameBoardData /*turns , activePlayer*/,
}) {
  // let gameBoard = gameBoardSetup;

  // for (const turn of turns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }

  return (
    <>
      <ol className='gameBoard'>
        {gameBoardData.map((eachArrayRow, eachArrayIndex) => (
          <li key={eachArrayIndex}>
            <ol>
              {eachArrayRow.map((playerSymbol, rowCloumnIndex) => (
                <li key={rowCloumnIndex}>
                  {/* use anonymous function so we have full control of how and when handleButtonClick() will be called */}
                  <button
                    onClick={() => onPlayerTurn(eachArrayIndex, rowCloumnIndex)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
