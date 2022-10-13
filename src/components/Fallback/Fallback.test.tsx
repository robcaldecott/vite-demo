import { expect, it } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { Fallback } from ".";

it("renders", () => {
  render(<Fallback />);
  expect(screen.getByRole("img", { name: /vite logo/i })).toBeInTheDocument();
});
