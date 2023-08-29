import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand header", () => {
  jest.mock("axios");

  render(<App />);
  const brand = screen.getByText(/Github Searcher/i);
  expect(brand).toBeInTheDocument();
});
