import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./LoginPage.jsx";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should render login form correctly", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should login successfully and navigate", async () => {
    const mockToken = "fake_token";
    axios.post.mockResolvedValue({ data: { token: mockToken } });

    renderWithRouter(<LoginPage />);
    userEvent.type(screen.getByPlaceholderText("Email"), "miawmiaw@gmail.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "qwerty123");
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe(mockToken);
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });

  it("should show error message on login failure", async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: "user not found" } },
    });

    renderWithRouter(<LoginPage />);
    userEvent.type(screen.getByPlaceholderText("Email"), "wrong@email.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "wrongpass");
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Login failed. user not found/i)
      ).toBeInTheDocument();
    });
  });
});
