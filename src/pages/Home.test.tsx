import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./Home";
import "@testing-library/jest-dom";

describe("Home component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should show 'No loggedUser found!' when there is no user logged", () => {
    localStorage.removeItem("loggedUser");
    render(<Home />);
    const heading = screen.getByText(/No loggedUser found!/i);
    expect(heading).toBeInTheDocument();
  });

  it("should show the heading with greetings 'hey username add a task'", () => {
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

    render(<Home />);
    const heading = screen.getByText(new RegExp(`hei user 1 add a task`, "i"));
    expect(heading).toBeInTheDocument();
  });

  it("should show the container for adding task when a user is logged in", () => {
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
    render(<Home />);
    const formTask = screen.getByLabelText(/task/i);
    expect(formTask).toBeInTheDocument();

    const formDescription = screen.getByLabelText(/description/i);
    expect(formDescription).toBeInTheDocument();

    const formSettime = screen.getByLabelText(/set time/i);
    expect(formSettime).toBeInTheDocument();

    const formButton = screen.getByRole("button", { name: /add task/i });
    expect(formButton).toBeInTheDocument();
  });

  it("should show 'No recent tasks, add a new one' when there is no tasks", () => {
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
    render(<Home />);
    const heading = screen.getByText(/No recent tasks, add a new one/i);
    expect(heading).toBeInTheDocument();
  });

  it("should show the recent 4 tasks when there is tasks", () => {
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
          status: "timeout",
          task: "task1",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 2 description",
          id: -0.1700944822244762,
          status: "completed",
          task: "task2",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 3 description",
          id: -0.1700944822244731,
          status: "pending",
          task: "task3",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 4 description",
          id: -0.1700944822244731,
          status: "pending",
          task: "task4",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
        {
          description: "project 5 description",
          id: -0.1700944822244731,
          status: "pending",
          task: "task5",
          time: "2024-11-18T10:14",
          userId: 1731558110081,
        },
      ])
    );
    render(<Home />);

    const heading = screen.getByText(/Recent Tasks/i);
    expect(heading).toBeInTheDocument();

    const taskName1 = screen.queryByText(/task1/i);
    expect(taskName1).not.toBeInTheDocument();

    const taskName2 = screen.getByText(/task2/i);
    expect(taskName2).toBeInTheDocument();

    const taskName3 = screen.getByText(/task3/i);
    expect(taskName3).toBeInTheDocument();

    const taskName4 = screen.getByText(/task4/i);
    expect(taskName4).toBeInTheDocument();

    const taskName5 = screen.getByText(/task5/i);
    expect(taskName5).toBeInTheDocument();
  });
});
