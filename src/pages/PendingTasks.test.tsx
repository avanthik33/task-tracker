import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import PendingTasks from "./PendingTasks";
import "@testing-library/jest-dom";

describe("PendingTask component", () => {
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
  it("should display 'No loggedUser found!' when there is no user", () => {
    localStorage.removeItem("loggedUser");
    render(<PendingTasks />);
    const heading = screen.getByRole("heading", {
      name: /no loggeduser found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should display the 'pending task' heading when a user is loggedIn", () => {
    signin();
    render(<PendingTasks />);
    expect(
      screen.getByRole("heading", { name: /pending tasks/i })
    ).toBeInTheDocument();
  });

  it("should display no pending task when there is no pending tasks", () => {
    signin();
    localStorage.setItem("tasks", JSON.stringify([]));
    render(<PendingTasks />);
    expect(
      screen.getByRole("heading", { name: /no pending task/i })
    ).toBeInTheDocument();
  });

  it("should display the pending tasks when there is pending tasks", () => {
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

    render(<PendingTasks />);
    expect(screen.queryByText(/task2/i)).toBeInTheDocument();
    expect(screen.queryByText(/task1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/task3/i)).not.toBeInTheDocument();
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
          time: "2024-11-18T10:14",
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

    render(<PendingTasks />);
    const pendingTask = screen.getByTestId("test-id--0.1700944822244763");
    expect(pendingTask).toBeInTheDocument();
    expect(pendingTask).not.toBeChecked();

    fireEvent.click(pendingTask);
    await waitFor(() => {
      expect(pendingTask).not.toBeInTheDocument();
    });
  });
});
