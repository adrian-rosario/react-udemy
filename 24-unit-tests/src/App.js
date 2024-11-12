import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import AsyncExample from "./components/AsyncExample";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <Welcome />

      <h2>Async example:</h2>
      <AsyncExample />
    </div>
  );
}

export default App;
