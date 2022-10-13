import { expect, it, vi } from "vitest";
import { render, screen, userEvent } from "@/utils/test-utils";
import { Error } from ".";

it("renders", async () => {
  const handleRetry = vi.fn();
  render(<Error message="An error" onRetry={handleRetry} />);
  expect(screen.getByTestId(/error/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /oops! something has gone wrong!/i,
    })
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /try again/i }));
  expect(handleRetry).toHaveBeenCalled();
});
