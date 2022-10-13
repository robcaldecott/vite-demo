import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Error } from "@/components/Error";
import { VehiclesList, VehiclesListLoading } from "@/components/VehicleList";
import { useVehicles } from "@/utils/queries";

export function VehiclesPage() {
  const { isLoading, isSuccess, data, isError, error, refetch } = useVehicles();

  return (
    <>
      <Breadcrumbs gutterBottom />

      {isLoading && <VehiclesListLoading />}
      {isSuccess && <VehiclesList vehicles={data} />}
      {isError && <Error message={error?.message} onRetry={refetch} />}
    </>
  );
}
