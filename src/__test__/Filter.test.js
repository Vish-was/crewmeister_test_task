/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Filter from "../components/Filter";

describe("Filter box", () => {
  it("When filter box show on the screen", () => {
    render(<Filter />);
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "Please Select" },
    });
    let options = screen.getAllByTestId("select-option");
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
  });
});
