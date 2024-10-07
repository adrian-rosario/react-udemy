import { styled } from "styled-components";

const Button = styled.button`
  white-space: nowrap;
  margin: 1rem auto;
  width: 100%;
  background-color: ${({ name }) => (name === "true" ? "#000" : "darkblue")};
  @media (min-width: 768px) {
    margin: 1rem 25%;
    width: auto;
  }
`;
export default Button;
