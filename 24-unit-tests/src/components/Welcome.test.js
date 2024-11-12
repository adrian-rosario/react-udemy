import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import userEvent from "@testing-library/user-event";

// - suite
describe("Welcome component", () => {
  test("validating welcome text value", () => {
    // - arrange
    render(<Welcome />);
    // - act: normally an action like clicking a button
    const theGreeting = screen.getByText(/Welcome to unit tests/i, {
      exact: true,
    });
    // - assert
    expect(theGreeting).toBeInTheDocument();
  });

  test("validating inital text before button interaction", () => {
    // - arrange
    render(<Welcome />);

    // - act: normally an action like clicking a button
    const theInitialText = screen.getByText(/The initial text value/i, {
      exact: true,
    });

    // - assert
    expect(theInitialText).toBeInTheDocument();
  });

  test("validating inital text after button interaction", () => {
    // - arrange
    render(<Welcome />);

    // - act
    const theButton = screen.getByRole("button");
    userEvent.click(theButton);

    const theChangedText = screen.getByText(/New Text Value/i, {
      exact: true,
    });

    // - assert
    expect(theChangedText).toBeInTheDocument();
  });

  test("validating initial state no longer visible after button click", () => {
    // - arrange
    render(<Welcome />);

    // - act: normally an action like clicking a button
    const theButton = screen.getByRole("button");
    userEvent.click(theButton);

    const theInitialText = screen.queryByText(/The initial text value/i, {
      exact: true,
    });

    // - assert
    // expect(theInitialText).not.toBeInTheDocument();
    expect(theInitialText).toBeNull();
  });
});
