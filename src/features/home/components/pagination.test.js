import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from "./pagination";

describe("Pagination Component", () => {
  it("renders without crashing", () => {
    const view = render(
      <Pagination totalPages={5} currentPage={3} onPageChange={() => {}} />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPageChange with correct value when Next is clicked", () => {
    const onPageChangeMock = jest.fn();
    const view = render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText("Next"));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with correct value when Previous is clicked", () => {
    const onPageChangeMock = jest.fn();
    const view = render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText("Previous"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
