import { styled } from "styled-components";
import { useState } from "react";
import Button from "./Button";

// tag template, javascript feature, like a function
// which receives the template literal as an input
const ControledContainer = styled.div`
  border: 1px solid #fff;
  border-radius: 1rem;
  padding: 1rem;
`;

const Label = styled.label`
  text-decoration: underline;
`;

export default function StyledComponents() {
  const [getMyStateValue, setMyStateValue] = useState(false);

  // console.log("beginning state value: " + getMyStateValue);

  function handleButtonClick() {
    setMyStateValue(!getMyStateValue);
    // console.log("the value? " + getMyStateValue);
  }

  return (
    <>
      <div>
        <h3>Styled Components, example</h3>
        <ControledContainer>
          <p>Some paragraph text</p>
          <div>
            <Label htmlFor='someThing'>Form field label:</Label>&nbsp;
            <input type='text' placeholder='some input filed' id='someThing' />
          </div>
          <div>
            <p>
              Some example state value: {getMyStateValue ? "true!" : "false"}
            </p>
            <Button
              name={getMyStateValue.toString()}
              onClick={handleButtonClick}
            >
              Some Button
            </Button>
          </div>
        </ControledContainer>
      </div>
    </>
  );
}
