import { expect, it, vi } from "vitest";
import { render, screen, userEvent } from "@/utils/test-utils";
import { VehicleDetails, VehicleDetailsLoading } from ".";

it("renders", async () => {
  const handleDelete = vi.fn();
  render(
    <VehicleDetails
      vehicle={{
        id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
        manufacturer: "Volkswagen",
        model: "Explorer",
        type: "Cargo Van",
        fuel: "Gasoline",
        vin: "1USTAN9Z5MNT86399",
        color: "teal",
        mileage: 70609,
        registrationDate: "2005-07-08T16:58:36.380Z",
        registrationNumber: "TE52 HWW",
      }}
      onDelete={handleDelete}
    />
  );
  expect(
    screen.getByText(/Volkswagen Explorer Cargo Van/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/TE52 HWW/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/colour/i)).toHaveTextContent(/teal/i);
  expect(screen.getByLabelText(/fuel/i)).toHaveTextContent(/gasoline/i);
  expect(screen.getByLabelText(/vin/i)).toHaveTextContent(/1USTAN9Z5MNT86399/i);
  expect(screen.getByLabelText(/mileage/i)).toHaveTextContent("70,609");
  expect(screen.getByLabelText(/registration date/i)).toHaveTextContent(
    "Friday, 8 July 2005"
  );
  // Delete
  await userEvent.click(
    screen.getByRole("button", { name: /delete vehicle/i })
  );
  expect(handleDelete).toHaveBeenCalled();
});

it("renders the loading variant", () => {
  render(<VehicleDetailsLoading />);
  expect(screen.getByLabelText(/loading vehicle details/i)).toBeInTheDocument();
});
