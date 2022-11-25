/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("navbar screen", () => {
  it("When navbar screen show", () => {
    render(<Navbar />);
    let title = screen.queryByText("Crewmeister").textContent;
    expect(title).toBe("Crewmeister");
  });
});
