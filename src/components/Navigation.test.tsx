import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navigation from "./Navigation";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("navigation component", () => {
  const renderNav = () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  };
  it("should display the homeLink", () => {
    renderNav();
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  it("should display the pendingLink ", () => {
    renderNav();
    const pendingLink = screen.getByText(/pending/i);
    expect(pendingLink).toBeInTheDocument();
  });

  it("should display the completedLink ", () => {
    renderNav();
    const completedLink = screen.getByText(/completed/i);
    expect(completedLink).toBeInTheDocument();
  });

  it("should display the timeoutLink ", () => {
    renderNav();
    const timeoutLink = screen.getByText(/timeout/i);
    expect(timeoutLink).toBeInTheDocument();
  });

  it("should display the button for signout", () => {
    renderNav();
    const signoutButton = screen.getByRole("button", { name: /signout/i });
    expect(signoutButton).toBeInTheDocument();
  });
});
