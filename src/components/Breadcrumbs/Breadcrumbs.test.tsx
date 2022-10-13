import { expect, it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { Breadcrumbs } from ".";

it("renders with no vehicles link", () => {
  render(<Breadcrumbs />);
  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByText(/vehicles/i)).toBeInTheDocument();
});

it("renders with a vehicles link", () => {
  render(<Breadcrumbs label="Test" />);
  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByRole("link", { name: /vehicles/i })).toHaveAttribute(
    "href",
    "/vehicles"
  );
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
