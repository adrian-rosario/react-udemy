import { ReactNode } from "react";

export default function Tabs({
  children,
  buttons,
  ButtonsContainer = "menu",
}: {
  children: ReactNode;
  buttons: ReactNode;
  ButtonsContainer: ReactNode;
}) {
  return (
    <>
      {/* use string names for built in elements, when using this class, ie. menu, ul, div */}
      {/* and if using custom elements use between curly braces */}
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
