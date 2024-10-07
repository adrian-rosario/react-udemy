import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import GameLog from "./components/GameLog";
import { WINNING_COMBINATIONS } from "./assets/model/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const GAME_BOARD_SETUP = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function setActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [getGameTurn, setGameTurn] = useState([]);
  const [getPlayers, setPlayers] = useState(PLAYERS);

  const activePlayer = setActivePlayer(getGameTurn);

  // add brand new array, not initial array
  // so rendering will be correct when we restart game
  let gameBoard = [...GAME_BOARD_SETUP.map((array) => [...array])];

  for (const turn of getGameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let theWinner;

  for (const combination of WINNING_COMBINATIONS) {
    const symbolFirstSquare =
      gameBoard[combination[0].row][combination[0].column];
    const symbolSecondSquare =
      gameBoard[combination[1].row][combination[1].column];
    const symbolThirdSquare =
      gameBoard[combination[2].row][combination[2].column];

    if (
      symbolFirstSquare &&
      symbolFirstSquare === symbolSecondSquare &&
      symbolFirstSquare === symbolThirdSquare
    ) {
      theWinner = getPlayers[symbolFirstSquare];
    }
  }

  const weHaveADraw = getGameTurn.length === 9 && !theWinner;

  function handlePlayerTurn(rowIndexClicked, columnIndexClicked) {
    setGameTurn((previousTurn) => {
      const currentPlayer = setActivePlayer(previousTurn);

      const updatedTurn = [
        {
          square: { row: rowIndexClicked, col: columnIndexClicked },
          player: currentPlayer,
        },
        ...previousTurn,
      ];

      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    console.log(`handlePlayerNameChange ?? ${symbol} ${newName}`);
    setPlayers((previousPlayersState) => {
      // overwrite name that has changed
      return { ...previousPlayersState, [symbol]: newName };
    });
  }

  return (
    <>
      <main>
        <div className='gameContainer'>
          <ol id='players'>
            <Player
              initialName={PLAYERS.X}
              symbol='X'
              activePlayer={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol='O'
              activePlayer={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
        </div>

        <div>
          <div>
            {(theWinner || weHaveADraw) && (
              <GameOver winner={theWinner} restartGame={handleRestart} />
            )}
          </div>

          <GameBoard
            onPlayerTurn={handlePlayerTurn}
            activePlayer={activePlayer}
            turns={getGameTurn}
            gameBoardData={gameBoard}
          />
        </div>

        <GameLog turns={getGameTurn} />
      </main>
    </>
  );
}

export default App;
