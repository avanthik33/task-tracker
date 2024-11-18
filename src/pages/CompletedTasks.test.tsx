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

  it("should show 'no completed tasks' when there are no completed tasks", () => {
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
    localStorage.setItem("tasks", JSON.stringify([]));
    render(<CompletedTasks />);
    const heading = screen.getByText(/NO Completed Tasks/i);
    expect(heading).toBeInTheDocument();
  });

  it("should show the completed tasks", () => {
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
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          description: "project 1 description",
          id: -0.1700944822244761,
          status: "completed",
          task: "task1",
          time: "2024-11-18T10:14",
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
        {
          description: "project 2 description",
          id: -0.1700944822244763,
          status: "pending",
          task: "task2",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
      ])
    );
    render(<CompletedTasks />);
    const task1 = screen.getByText(/task1/i);
    expect(task1).toBeInTheDocument();

    const task2 = screen.queryByText(/task2/i);
    expect(task2).not.toBeInTheDocument();

    const task3 = screen.queryByText(/task3/i);
    expect(task3).not.toBeInTheDocument();
  });
});
