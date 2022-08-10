import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

test("renders Welcome link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Learn React/i);
  expect(linkElement).toBeInTheDocument();
});
