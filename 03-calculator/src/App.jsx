import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";

function App() {
  const [getFormState, setFormState] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValue = getFormState.duration >= 1;

  function handleFormChange(inputId, newValue) {
    console.log(`handleFormChange id: ${inputId} value: ${newValue}`);
    setFormState((previousState) => {
      return {
        ...previousState,
        [inputId]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput onChangeInput={handleFormChange} getFormState={getFormState} />

      {inputIsValue && <Results onChangeInput={getFormState} />}
      {!inputIsValue && <p>please enter a duration more than zero</p>}
    </>
  );
}

export default App;
