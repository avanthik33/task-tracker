import {  render, screen } from "@testing-library/react";
import CompletedTasks from "./CompletedTasks";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("CompletedTask component", () => {
  //signin function
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
  beforeEach(() => {
    localStorage.clear();
  });

  it("should show the 'completed tasks' heading when a user is logged in", () => {
    signin();
    render(<CompletedTasks />);
    const heading = screen.getByRole("heading", { name: /completed tasks/i });
    expect(heading).toBeInTheDocument();
  });

  it("should show the 'no logged user found' heading when no user is logged in", () => {
    localStorage.removeItem("loggedUser");
    render(<CompletedTasks />);
    const heading = screen.getByRole("heading", {
      name: /no loggeduser found!/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should show 'no completed tasks' when there are no completed tasks", () => {
    signin();
    localStorage.setItem("tasks", JSON.stringify([]));
    render(<CompletedTasks />);
    const heading = screen.getByRole("heading", {
      name: /No completed Tasks/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should show the completed tasks", () => {
    signin();
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
          time: "2025-11-18T10:14",
          userId: 1731558110081,
        },
      ])
    );
    render(<CompletedTasks />);
    const task1 = screen.getByRole("heading", { name: /task1/i });
    expect(task1).toBeInTheDocument();

    const task2 = screen.queryByRole("heading", { name: /task2/i });
    expect(task2).not.toBeInTheDocument();

    const task3 = screen.queryByRole("heading", { name: /taks3/i });
    expect(task3).not.toBeInTheDocument();

    const task1Due = screen.getByText(/due:/i);
    expect(task1Due).toBeInTheDocument();
  });

  it("should handle the checkbox changes", async () => {
    signin();

    localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          description: "project 1 description",
          id: -0.1700944822244761,
          status: "completed",
          task: "task1",
          time: "2024-11-19T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 2 description",
          id: -0.1700944822244762,
          status: "pending",
          task: "task2",
          time: "2024-11-20T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 3 description",
          id: -0.1700944822244763,
          status: "timeout",
          task: "task3",
          time: "2024-11-17T10:14",
          userId: 1731558110081,
        },
      ])
    );

    render(<CompletedTasks />);
    screen.debug();
    userEvent.setup();
    const taskCheckbox = screen.getByTestId("data-test--0.1700944822244761");
    expect(taskCheckbox).toBeChecked();
    expect(taskCheckbox).toBeInTheDocument();
    
    await userEvent.click(taskCheckbox);
    expect(taskCheckbox).not.toBeInTheDocument();
  });
});
