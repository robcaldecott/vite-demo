import { expect, it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import HomePage from ".";

it("renders", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", { level: 1, name: /welcome to vite/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /vite logo/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /go to vehicles page/i })
  ).toHaveAttribute("href", "/vehicles");
});
