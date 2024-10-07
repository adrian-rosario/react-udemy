import "./App.css";
import Player from "./components/Player";
import TimerChallenge from "./components/TimerChallenge";

function App() {
  return (
    <>
      <div>
        <h1>Refs &amp; Portals</h1>

        <p>Try to click the Timer before the timer ends.</p>

        <Player />

        <h2>Challenges</h2>
        <div className='challenges'>
          <TimerChallenge title='Easy' targetTime={1} />
          <TimerChallenge title='Not Easy' targetTime={8} />
          <TimerChallenge title='Tough' targetTime={12} />
          <TimerChallenge title='Boss' targetTime={16} />
        </div>
      </div>
    </>
  );
}

export default App;
