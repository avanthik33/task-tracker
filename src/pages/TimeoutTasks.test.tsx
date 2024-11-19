import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import TimoutTasks from "./TimoutTasks";
import "@testing-library/jest-dom";

describe("TimoutTasks component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const signin = () => {
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
  };
  it("should display 'no loggedUser found!' when there is not loggedUser", () => {
    localStorage.removeItem("loggedUser");
    render(<TimoutTasks />);
    expect(screen.getByText(/no loggeduser found!/i)).toBeInTheDocument();
  });

  it("should display timeout tasks when the page loads", () => {
    signin();
    render(<TimoutTasks />);
    expect(screen.getByText(/timeout tasks/i)).toBeInTheDocument();
  });

  it("should display 'no timeout tasks' when there is not timeout tasks", () => {
    signin();

    localStorage.setItem("tasks", JSON.stringify([]));
    render(<TimoutTasks />);
    expect(screen.getByText(/no timeout tasks/i)).toBeInTheDocument();
  });

  it("should display all the timeout tasks", () => {
    signin();

    localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          description: "project 1 description",
          id: -0.1700944822244761,
          status: "completed",
          task: "task1",
          time: "2024-11-20T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 2 description",
          id: -0.1700944822244763,
          status: "pending",
          task: "task2",
          time: "2025-11-20T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 3 description",
          id: -0.1700944822244762,
          status: "timeout",
          task: "task3",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
      ])
    );
    render(<TimoutTasks />);
    expect(screen.getByText(/task3/i)).toBeInTheDocument();
    expect(screen.queryByText(/task1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/task2/i)).not.toBeInTheDocument();
  });
});
