import { useState } from "react";

export function useInput(defaultValue, validationFunction) {
  // - note no curly braces

  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFunction(enteredValue);

  function handleInputChange(event) {
    // console.log(`${event.targetid} - ${event.target.value}`);

    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleBlur,
    hasError: didEdit && !valueIsValid,
  };
}
