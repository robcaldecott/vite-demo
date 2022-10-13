import { expect, it } from "vitest";
import { render, screen, within } from "@/utils/test-utils";
import { VehiclesList, VehiclesListLoading } from ".";

it("renders", () => {
  render(
    <VehiclesList
      vehicles={[
        {
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
        },
      ]}
    />
  );
  expect(
    screen.getByRole("heading", { level: 1, name: /vehicles/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/count of vehicles/i)).toHaveTextContent("1");
  expect(screen.getByRole("link", { name: /add vehicle/i })).toHaveAttribute(
    "href",
    "/vehicles/add"
  );
  const item = screen.getByRole("link", {
    name: /Volkswagen Explorer Cargo Van/i,
  });
  expect(item).toHaveAttribute(
    "href",
    "/vehicles/5e0562c5-a50b-42ff-83e5-4c004c5b639a"
  );
  expect(within(item).getByText(/TE52 HWW/i)).toBeInTheDocument();
});

it("renders the loading variant", () => {
  render(<VehiclesListLoading />);
  expect(screen.getByLabelText(/Loading vehicle list/i)).toBeInTheDocument();
});
