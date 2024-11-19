import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Fallback from "./Fallback";
import "@testing-library/jest-dom";

describe("Fallback component", () => {
  it("should display 'Incorrect path'", () => {
    render(<Fallback />);
    expect(screen.getByText("Incorrect path")).toBeInTheDocument();
  });

  it("should display 'The page you are looking for does not exist.'", () => {
    render(<Fallback />);
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("should display the link to go home", () => {
    render(<Fallback />);

    expect(
      screen.getByRole("link", { name: /Go to Home/i })
    ).toBeInTheDocument();
  });
});
