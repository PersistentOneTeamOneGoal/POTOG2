/* eslint-disable testing-library/await-async-utils */
import axios from "axios";
import App from "../../App";
import {
  render,
  waitFor,
  screen,
  cleanup,
  fireEvent,
  debug,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

afterEach(cleanup);

jest.mock("axios");

describe("Check UI elements", () => {
  it("Check if there is a button", async () => {
    render(<App />, { wrapper: MemoryRouter });
    const btn = waitFor(() => screen.getByTestId("order-btn"));
    expect(btn).toBeTruthy();
  });

  it("Check if there is an input field for name", () => {
    render(<App />, { wrapper: MemoryRouter });
    const inputName = waitFor(() => screen.getByTestId("name"));
    expect(inputName).toBeTruthy();
  });

  it("Check if there is an input field for password", () => {
    render(<App />, { wrapper: MemoryRouter });
    // check if button exist
    const inputNum = waitFor(() => screen.getByTestId("number"));
    expect(inputNum).toBeTruthy();
  });

  it("Check if there is an input field for email", () => {
    render(<App />, { wrapper: MemoryRouter });
    const inputEmail = waitFor(() => screen.getByTestId("email"));
    expect(inputEmail).toBeTruthy();
  });
});

describe("This is to test axios", () => {
  const data = {
    senderId: "e8387ff0-fb67-40f5-b3f2-822571e1c02c",
    to: "e8387ff0-fb67-40f5-b3f2-822571e1c02c@mailslurp.com",
    subject: `BananaPeel - Order for Sample User`,
    body: `Good day, user Sample User! We have received your order entailing these following items: Sample Item. With total price of: $200. To confirm order, click the confirmation link below https://bananapeel.com`,
  };
  it("checks for the axios data", async () => {
    axios.post.mockResolvedValueOnce(data);
  });
});
