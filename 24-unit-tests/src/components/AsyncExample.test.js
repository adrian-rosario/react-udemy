import { render, screen } from "@testing-library/react";
import AsyncExample from "./AsyncExample";

describe("validating async component", () => {
  test("validate fetch", async () => {
    // - arrange
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "a1", title: "one post" }],
    });
    render(<AsyncExample />);

    // - act

    // - assert
    const listItems = await screen.findAllByRole("listitem", {}, {});
    expect(listItems).not.toHaveLength(0);
  });
});
