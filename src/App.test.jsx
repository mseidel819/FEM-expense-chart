/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("Renders the app", () => {
  render(<App />);
  const balanceElement = screen.getByText("My balance");
  const graphElement = screen.getByText("Spending - Last 7 days");
  const totalsElement = screen.getByText("Total this week");

  expect(balanceElement).toBeInTheDocument();
  expect(graphElement).toBeInTheDocument();
  expect(totalsElement).toBeInTheDocument();
});
