import { expect, it } from "vitest";
import { render, screen, userEvent, within } from "@/utils/test-utils";
import { AppHeader } from ".";

it("renders", () => {
  render(<AppHeader />);
  const header = within(screen.getByRole("banner"));
  expect(header.getByRole("img", { name: /zego logo/i })).toBeInTheDocument();
  expect(
    header.getByRole("button", { name: /switch theme/i })
  ).toBeInTheDocument();
});

it("switches modes", async () => {
  render(<AppHeader />);
  await userEvent.click(screen.getByTestId(/darkmodeicon/i));
  expect(screen.getByTestId(/lightmodeicon/i)).toBeInTheDocument();
});
