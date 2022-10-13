import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Vehicle } from "@/types";
import { http } from "@/utils/http";

export function useVehicles() {
  return useQuery<Array<Vehicle>, Error>(["vehicles"], () => {
    return http.get("/api/vehicles");
  });
}

export function useVehicleDetails(id: string) {
  return useQuery<Vehicle, Error>(["vehicle", id], () => {
    return http.get(`/api/vehicles/${id}`);
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation<Vehicle, Error, string, Vehicle[]>(
    (id) => http.delete(`/api/vehicles/${id}`),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["vehicles"]);
        // Remove the vehicles immediately
        const previous = queryClient.getQueryData<Vehicle[]>(["vehicles"]);
        if (previous) {
          queryClient.setQueryData(
            ["vehicles"],
            previous.filter((vehicle) => vehicle.id !== id)
          );
        }
        return previous;
      },
      onError: (error, id, context) => {
        // Revert the original list of vehicles on error
        if (context) {
          queryClient.setQueryData(["vehicles"], context);
        }
      },
      onSettled: () => {
        // Fetch the list of new vehicles
        queryClient.invalidateQueries(["vehicles"]);
      },
    }
  );
}

export function useAddVehicle() {
  return useMutation<Vehicle, Error, Omit<Vehicle, "id">>(
    (body) => {
      return http.post("/api/vehicles", { json: body });
    },
    { useErrorBoundary: false }
  );
}
