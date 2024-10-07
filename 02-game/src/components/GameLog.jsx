import PropTypes from "prop-types";

GameLog.propTypes = {
  turns: PropTypes.any,
};

export default function GameLog({ turns }) {
  return (
    <>
      <ol className='gameLog'>
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            Player: {turn.player}, Selected: {turn.square.row} {turn.square.col}
          </li>
        ))}
      </ol>
    </>
  );
}
