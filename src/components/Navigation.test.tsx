import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navigation from "./Navigation";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("navigation component", () => {
  const renderNav = () => {
    render(<Navigation />, { wrapper: BrowserRouter });
  };
  it("should display the homeLink", () => {
    renderNav();
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it("should display the pendingLink ", () => {
    renderNav();
    const pendingLink = screen.getByRole("link", { name: /pending/i });
    expect(pendingLink).toBeInTheDocument();
  });

  it("should display the completedLink ", () => {
    renderNav();
    const completedLink = screen.getByRole("link", { name: /completed/i });
    expect(completedLink).toBeInTheDocument();
  });

  it("should display the timeoutLink ", () => {
    renderNav();
    const timeoutLink = screen.getByRole("link", { name: /timeout/i });
    expect(timeoutLink).toBeInTheDocument();
  });

  it("should display the button for signout", () => {
    renderNav();
    const signoutButton = screen.getByRole("button", { name: /signout/i });
    expect(signoutButton).toBeInTheDocument();
  });
});
