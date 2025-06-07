import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import RegisterPage from "./index";

jest.mock("axios");

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs and button", () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("successful registration shows success message", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "fake_token" } });

    render(<RegisterPage />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "eve.holt@reqres.in"
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), "pistol");
    userEvent.click(screen.getByRole("button", { name: /register/i }));

    // wait for success message
    await waitFor(() => {
      expect(screen.getByText(/register success/i)).toBeInTheDocument();
      expect(screen.getByText(/register success/i)).toHaveClass(
        "text-green-500"
      );
    });
  });

  test("failed registration shows error message", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: "Missing password" } },
    });

    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText(/email/i), "sydney@fife");
    // leave password empty
    userEvent.click(screen.getByRole("button", { name: /register/i }));

    // wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/register failed : missing password/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/register failed : missing password/i)
      ).toHaveClass("text-red-500");
    });
  });
});
