import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Signin from "./Signin";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Signin Component", () => {
  const renderSignin = () => {
    render(<Signin />, { wrapper: BrowserRouter });
  };
  beforeEach(() => {
    localStorage.clear();
  });
  it("should display 'signin' heading", () => {
    renderSignin();
    expect(
      screen.getByRole("heading", { name: /signin/i })
    ).toBeInTheDocument();
  });

  it("should display signin lables", () => {
    render(<Signin />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signin/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Click here to create account../i })
    ).toBeInTheDocument();
  });

  it("should show error message when no input fileds", async () => {
    renderSignin();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByText(/fill all input fields!/i)).toBeInTheDocument();
    });
  });

  it("should show error message when authentication credintials not mathches", async () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        {
          email: "user1@gmail.com",
          password: "avanthik",
        },
        {
          email: "user2@gmail.com",
          password: "avanthik",
        },
      ])
    );
    renderSignin();
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(emailField, { target: { value: "avanthik@gmail.com" } });
    fireEvent.change(passwordField, { target: { value: "avanthik" } });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(
        screen.getByText(/Incorrect Email or Password/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toHaveTextContent("");
      expect(screen.getByLabelText("Password")).toHaveTextContent("");
    });
  });

  it("should check the input filed value when the user types", async () => {
    userEvent.setup();
    renderSignin();
    const inputEmail = screen.getByRole("textbox");
    await userEvent.type(inputEmail, "avanthk@gmail.com");
    expect(inputEmail).toHaveValue();
  });

  it("should check if the error message fades away after 3sec", async () => {
    renderSignin();
    screen.debug();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByTestId("error-heading")).toBeInTheDocument();
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.queryByTestId("error-heading")).not.toBeInTheDocument();
  });
});
