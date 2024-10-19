import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import LoginUsingState from "./components/LoginUsingState.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Login />

        <LoginUsingState />

        <Signup />
      </main>
    </>
  );
}

export default App;
