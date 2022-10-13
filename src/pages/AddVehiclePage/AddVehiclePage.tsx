import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AddVehicleForm } from "@/components/AddVehicleForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useAddVehicle } from "@/utils/queries";

export function AddVehiclePage() {
  const navigate = useNavigate();
  const { mutate, error } = useAddVehicle();

  return (
    <>
      <Breadcrumbs
        label={<FormattedMessage defaultMessage="Add" />}
        gutterBottom
      />

      <AddVehicleForm
        onSubmit={(data) => {
          console.log(data);
          mutate(data, {
            onSuccess: () => {
              navigate(-1);
            },
          });
        }}
        onCancel={() => {
          navigate(-1);
        }}
        error={error?.message}
      />
    </>
  );
}
