import { render, waitFor } from "@testing-library/react";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText, debug } = render(<App />);
    debug();
    getByText("logged-out");
  });
  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);

    // waitFor은 state가 refresh하고 쓸 수 있을 때까지 기다려준다.
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("logged-in");
  });
});
