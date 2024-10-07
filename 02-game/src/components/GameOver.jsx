import PropTypes from "prop-types";

GameOver.propTypes = {
  winner: PropTypes.string,
  restartGame: PropTypes.any,
};

export default function GameOver({ winner, restartGame }) {
  return (
    <>
      <div className='gameOver'>
        <h3>Game Over</h3>
        {winner && <p>{winner} won</p>}
        {!winner && <p>We have a draw</p>}
        <div>
          <button onClick={restartGame}>Restart</button>
        </div>
      </div>
    </>
  );
}
