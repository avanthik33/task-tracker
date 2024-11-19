import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Error from "./Error";
import "@testing-library/jest-dom";

describe("Error component", () => {
  it("should display the error messages", () => {
    render(<Error message="somthing error" />);
    const displayError = screen.getByText("somthing error");
    expect(displayError).toBeInTheDocument();
  });
});
