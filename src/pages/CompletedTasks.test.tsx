import { render, screen } from "@testing-library/react";
import CompletedTasks from "./CompletedTasks";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

describe("Completed task component", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should show the 'completed tasks' heading when a user is logged in", () => {
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
    render(<CompletedTasks />);
    const heading = screen.getByText(/completed tasks/i, { exact: false });
    expect(heading).toBeInTheDocument();
  });

  it("should show the 'no logged user found' heading when no user is logged in", () => {
    localStorage.removeItem("loggedUser");
    render(<CompletedTasks />);
    const heading = screen.getByText(/no loggeduser found!/i);
    expect(heading).toBeInTheDocument();
  });

  
});
