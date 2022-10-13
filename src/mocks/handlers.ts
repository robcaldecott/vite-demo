import { DefaultBodyType, PathParams, rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import type { Vehicle } from "@/types";
import { randomVehicles } from "./vehicles";

let vehicles = randomVehicles(25);

const handlers = [
  // Fetch a list of vehicles
  rest.get<DefaultBodyType, PathParams, Vehicle[]>(
    "/api/vehicles",
    (req, res, ctx) => {
      return res(ctx.delay(), ctx.json(vehicles));
    }
  ),
  // Fetch details for a specific vehicle
  rest.get<DefaultBodyType, { vehicleId: string }, Vehicle>(
    "/api/vehicles/:vehicleId",
    (req, res, ctx) => {
      const { vehicleId } = req.params;
      const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      return vehicle
        ? res(ctx.delay(), ctx.json(vehicle))
        : res(ctx.status(404));
    }
  ),
  // Add a new vehicle
  rest.post<Omit<Vehicle, "id">, PathParams, Vehicle>(
    "/api/vehicles",
    (req, res, ctx) => {
      const vehicle: Vehicle = {
        id: uuidv4(),
        ...req.body,
      };
      vehicles.push(vehicle);
      return res(ctx.delay(), ctx.json(vehicle));
    }
  ),
  // Delete a vehicle
  rest.delete<DefaultBodyType, { vehicleId: string }, { id: string }>(
    "/api/vehicles/:vehicleId",
    (req, res, ctx) => {
      const { vehicleId } = req.params;
      vehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
      return res(ctx.delay(), ctx.json({ id: vehicleId }));
    }
  ),
];

export { handlers };
