import { expect, it, vi } from "vitest";
import { render, screen, userEvent } from "@/utils/test-utils";
import { AddVehicleForm } from ".";

it("submits", async () => {
  const handleCancel = vi.fn();
  const handleSubmit = vi.fn();
  render(<AddVehicleForm onCancel={handleCancel} onSubmit={handleSubmit} />);
  // Complete the form
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /make/i }),
    "Ford"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /model/i }),
    "fiesta"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /variant/i }),
    "1.6L"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /fuel type/i }),
    "Electric"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /colour/i }),
    "Yellow"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /registration number/i }),
    "ZE72 ABC"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /vin/i }),
    "VIN1234567890"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /mileage/i }),
    "12345"
  );
  await userEvent.type(
    screen.getByLabelText(/registration date/i),
    "2021-12-31"
  );
  // Submit
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(handleSubmit).toHaveBeenCalledWith({
    manufacturer: "Ford",
    model: "fiesta",
    type: "1.6L",
    fuel: "Electric",
    color: "Yellow",
    registrationNumber: "ZE72 ABC",
    vin: "VIN1234567890",
    mileage: 12345,
    registrationDate: "2021-12-31",
  });
});

it("cancels", async () => {
  const handleCancel = vi.fn();
  const handleSubmit = vi.fn();
  render(<AddVehicleForm onCancel={handleCancel} onSubmit={handleSubmit} />);
  await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
  expect(handleCancel).toHaveBeenCalled();
});

it("validates", async () => {
  render(<AddVehicleForm onCancel={vi.fn()} onSubmit={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/please select a make/i)).toBeInTheDocument();
  expect(screen.getByText(/please select a fuel type/i)).toBeInTheDocument();
  expect(screen.getByText(/please select a colour/i)).toBeInTheDocument();
  expect(
    screen.getByText(/please enter the registration number/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/please enter a valid mileage/i)).toBeInTheDocument();
  expect(
    screen.getByText(/please enter the registration date/i)
  ).toBeInTheDocument();
});

it("renders an error message", () => {
  render(
    <AddVehicleForm error="An error" onCancel={vi.fn()} onSubmit={vi.fn()} />
  );
  expect(screen.getByText(/an error/i)).toBeInTheDocument();
});
