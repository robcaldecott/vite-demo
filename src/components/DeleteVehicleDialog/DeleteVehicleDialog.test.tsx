import { expect, it, vi } from "vitest";
import { render, screen, userEvent, within } from "@/utils/test-utils";
import { DeleteVehicleDialog } from ".";

it("renders", async () => {
  const handleClose = vi.fn();
  const handleDelete = vi.fn();
  render(
    <DeleteVehicleDialog open onClose={handleClose} onDelete={handleDelete} />
  );
  const dialog = within(
    screen.getByRole("dialog", { name: /delete vehicle/i })
  );
  expect(
    dialog.getByRole("heading", { level: 2, name: /delete vehicle/i })
  ).toBeInTheDocument();
  expect(
    dialog.getByText(/are you sure you want to delete this vehicle\?/i)
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
  expect(handleClose).toHaveBeenCalled();

  await userEvent.click(screen.getByRole("button", { name: /delete/i }));
  expect(handleDelete).toHaveBeenCalled();
});
