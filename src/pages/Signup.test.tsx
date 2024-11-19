import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Signup component", () => {
  const renderSignup = () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  };

  it("should display 'signup' at the top", () => {
    renderSignup();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
  });

  it("should dispay all the labels inside the signup container", () => {
    renderSignup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Click here to signin/i })
    ).toBeInTheDocument();
  });

  it("should display error message when password != confirm password using onBlur", async () => {
    renderSignup();
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "avanthik123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "avanthik1234" },
    });
    fireEvent.blur(screen.getByLabelText(/confirm password/i));
    await waitFor(() => {
      expect(
        screen.getByText(/Password and confirm password do not match!/i, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
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
    await waitFor(() => {
      expect(
        screen.getByText(/password and confirm password in not match!/i, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });

  it("should display error messages when input fields are missing", async () => {
    renderSignup();

    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByText(/Username is required./i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "avanthik" },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "avanthik@gmail.com" },
    });

    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(
        screen.getByText(/Phone number is required./i)
      ).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "0099090000" },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
    });
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
    await waitFor(() => {
      expect(screen.getByTestId("error-heading")).toBeInTheDocument();
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.queryByTestId("error-heading")).not.toBeInTheDocument();
  });

  it("should show the loading icon when loading state is true",()=>{
    
  });
});
