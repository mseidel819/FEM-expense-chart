/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Graph from "./graph.component";

//TODO mock the framer-motion library to get rid of animtions.
//TODO expect the graph to have bar heights relative to the data.

const mockData = [
  { day: "mon", amount: 30 },
  { day: "tue", amount: 50 },
  { day: "wed", amount: 70 },
  { day: "thu", amount: 40 },
  { day: "fri", amount: 60 },
  { day: "sat", amount: 40 },
  { day: "sun", amount: 50 },
];

describe("Graph component", () => {
  it("Renders the graph", () => {
    render(<Graph data={mockData} />);

    // get graph by id

    const graphElement = screen.getByTestId("svg-container");
    const bars = screen.getAllByTestId("bar");

    expect(graphElement).toBeInTheDocument();
    expect(bars.length).toBe(mockData.length);
  });
});
