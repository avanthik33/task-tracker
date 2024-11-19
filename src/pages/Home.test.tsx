import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./Home";
import "@testing-library/jest-dom";

describe("Home component", () => {
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
  it("should show 'No loggedUser found!' when there is no user logged", () => {
    localStorage.removeItem("loggedUser");
    render(<Home />);
    const heading = screen.getByText(/No loggedUser found!/i);
    expect(heading).toBeInTheDocument();
  });

  it("should show the heading with greetings 'hey username add a task'", () => {
    signin();

    render(<Home />);
    const heading = screen.getByText(new RegExp(`hei user 1 add a task`, "i"));
    expect(heading).toBeInTheDocument();
  });

  it("should show the container for adding task when a user is logged in", () => {
    signin();
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
    signin();
    localStorage.setItem("tasks", JSON.stringify([]));
    render(<Home />);
    const heading = screen.getByText(/No recent tasks, add a new one/i);
    expect(heading).toBeInTheDocument();
  });

  it("should show the recent 4 tasks when there is tasks", () => {
    signin();
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

  it("should show the error message 'fill all the input fileds' when no input submit", () => {
    signin();
    render(<Home />);

    const submitButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/fill all the input fields!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should change status when clicking checkbox", async () => {
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

    render(<Home />);

    // task 1
    const task1Status = screen.getByTestId(
      "task-checkbox-status--0.1700944822244761"
    );
    expect(task1Status).toHaveTextContent(/completed/i);
    const task1Checkbox = screen.getByTestId(
      "task-checkbox--0.1700944822244761"
    );
    expect(task1Checkbox).toBeChecked();
    fireEvent.click(task1Checkbox);
    await waitFor(() => {
      expect(task1Status).toHaveTextContent(/pending/i);
      expect(task1Checkbox).not.toBeChecked();
    });

    // task 2
    const task2Status = screen.getByTestId(
      "task-checkbox-status--0.1700944822244762"
    );
    expect(task2Status).toHaveTextContent(/pending/i);
    const task2Checkbox = screen.getByTestId(
      "task-checkbox--0.1700944822244762"
    );
    expect(task2Checkbox).not.toBeChecked();
    fireEvent.click(task2Checkbox);
    await waitFor(() => {
      expect(task2Status).toHaveTextContent(/completed/i);
      expect(task2Checkbox).toBeChecked();
    });

    //task3
    const task3Status = screen.getByTestId(
      "task-checkbox-status--0.1700944822244763"
    );
    expect(task3Status).toHaveTextContent(/timeout/i);
    const task3Checkbox = screen.queryByTestId(
      "task-checkbox--0.1700944822244763"
    );
    expect(task3Checkbox).toBeNull();
  });
});
