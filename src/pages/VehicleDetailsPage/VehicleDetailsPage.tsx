import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeleteVehicleDialog } from "@/components/DeleteVehicleDialog";
import { Error } from "@/components/Error";
import {
  VehicleDetails,
  VehicleDetailsLoading,
} from "@/components/VehicleDetails";
import { useDeleteVehicle, useVehicleDetails } from "@/utils/queries";

export function VehicleDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, isSuccess, data, isError, error, refetch } =
    useVehicleDetails(params.id!);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate } = useDeleteVehicle();

  return (
    <>
      <Breadcrumbs
        label={isLoading ? <Skeleton width={100} /> : data?.registrationNumber}
        gutterBottom
      />

      {isLoading && <VehicleDetailsLoading />}
      {isSuccess && (
        <>
          <VehicleDetails
            vehicle={data}
            onDelete={() => setShowDeleteDialog(true)}
          />

          <DeleteVehicleDialog
            open={showDeleteDialog}
            onClose={() => {
              setShowDeleteDialog(false);
            }}
            onDelete={() => {
              setShowDeleteDialog(false);
              mutate(data.id, {
                onSuccess: () => {
                  // Back to the vehicles page
                  navigate(-1);
                },
              });
            }}
          />
        </>
      )}
      {isError && <Error message={error?.message} onRetry={refetch} />}
    </>
  );
}
