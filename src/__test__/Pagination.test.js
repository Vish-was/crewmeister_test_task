/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination show", () => {
  it("When pagination component render", () => {
    let pageCount = 10;
    const handleChangePage = jest.fn();
    render(
      <Pagination pageCount={pageCount} handleChangePage={handleChangePage} />
    );
  });
});
