import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the portfolio introduction and selected work", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: /complex data/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /data products built/i })
  ).toBeInTheDocument();
});
