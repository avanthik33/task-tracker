import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Signup component", () => {
  const renderSignup = () => {
    render(<Signup />, { wrapper: BrowserRouter });
  };

  const labelNames = [
    "Username",
    "Email",
    "Phone",
    "Password",
    "Confirm Password",
  ];

  it("should display 'signup' at the top", () => {
    renderSignup();
    expect(
      screen.getByRole("heading", { name: "Sign Up" })
    ).toBeInTheDocument();
  });

  it("should dispay all the labels inside the signup container", () => {
    renderSignup();

    for (let i = 0; i < labelNames.length; i++) {
      const item = screen.getByLabelText(labelNames[i]);
      expect(item).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Click here to signin/i })
    ).toBeInTheDocument();
  });

  it("should display error message when password != confirm password using onBlur", async () => {
    userEvent.setup();
    renderSignup();
    await userEvent.type(screen.getByLabelText("Password"), "avanthik123");
    await userEvent.type(
      screen.getByLabelText("Confirm Password"),
      "avanthik1234"
    );

    fireEvent.blur(screen.getByLabelText(/confirm password/i));
    expect(
      screen.getByText(/Password and confirm password do not match!/i)
    ).toBeInTheDocument();
  });

  it("should be display error messages when passwords does not match on form submit", async () => {
    renderSignup();
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "avanthik123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: "avanthik124" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(
      screen.getByText(/password and confirm password in not match!/i, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("should display error messages when input fields are missing", async () => {
    renderSignup();
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText(/Username is required./i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "avanthik" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "avanthik@gmail.com" },
    });

    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText(/Phone number is required./i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "0099090000" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "avanthik123" },
    });
    fireEvent.submit(screen.getByRole("form"));
  });

  it("should check the input filed value when the user types", async () => {
    userEvent.setup();
    renderSignup();
    const inputEmail = screen.getByRole("textbox", { name: "Email" });
    await userEvent.type(inputEmail, "avanthik@gmail.com");
    expect(inputEmail).toHaveValue("avanthik@gmail.com");
  });

  it("should check if the error message fades away after 3sec", async () => {
    renderSignup();
    screen.debug();
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByTestId("error-heading")).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.queryByTestId("error-heading")).not.toBeInTheDocument();
  });
});
