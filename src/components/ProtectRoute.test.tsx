import { beforeEach, describe, expect, it } from "vitest";
import { ProtectRoute } from "./ProtectRoute";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("ProtectRoute component", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should display 'Loading...' when there is no loggedUser", () => {
    render(
      <BrowserRouter>
        <ProtectRoute>
          <div>protected content</div>
        </ProtectRoute>
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Loading.../i, { exact: false })
    ).toBeInTheDocument();
  });

  it("should not show 'Loading' when there is a loggedUser", () => {
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({
        confirmPass: "avanthik",
        email: "user1@gmail.com",
        password: "avanthik",
        phone: "00000000000",
        userId: 1731558110081,
        username: "user 1",
      })
    );
    render(
      <BrowserRouter>
        <ProtectRoute>
          <div>protected content</div>
        </ProtectRoute>
      </BrowserRouter>
    );
    expect(
      screen.queryByText(/Loading.../i, { exact: false })
    ).not.toBeInTheDocument();
  });
});
