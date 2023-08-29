import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./search";

describe("Search Component", () => {
  it("renders without crashing", () => {
    render(
      <Search
        query=""
        handleInputChange={() => {}}
        type="users"
        handleTypeChange={() => {}}
        defaultType="users"
      />
    );
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls handleInputChange when input value changes", () => {
    const handleInputChangeMock = jest.fn();
    render(
      <Search
        query=""
        handleInputChange={handleInputChangeMock}
        type="users"
        handleTypeChange={() => {}}
        defaultType="users"
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });
    expect(handleInputChangeMock).toHaveBeenCalled();
  });
});
