// import { useState } from 'react'
import "./App.css";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Header />
        <Quiz />
      </main>
    </>
  );
}

export default App;
