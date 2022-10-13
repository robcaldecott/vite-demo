import { useForm } from "react-hook-form";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { colors, fuelTypes, manufacturers } from "@/mocks/vehicles";
import type { Vehicle } from "@/types";

type FormInputs = Omit<Vehicle, "id" | "mileage"> & { mileage: number };

function schema(intl: IntlShape) {
  return yup.object({
    manufacturer: yup
      .string()
      .required(intl.formatMessage({ defaultMessage: "Please select a make" })),
    model: yup
      .string()
      .required(intl.formatMessage({ defaultMessage: "Please enter a model" })),
    fuel: yup
      .string()
      .required(
        intl.formatMessage({ defaultMessage: "Please select a fuel type" })
      ),
    color: yup
      .string()
      .required(
        intl.formatMessage({ defaultMessage: "Please select a colour" })
      ),
    registrationNumber: yup.string().required(
      intl.formatMessage({
        defaultMessage: "Please enter the registration number",
      })
    ),
    mileage: yup
      .number()
      .typeError(
        intl.formatMessage({ defaultMessage: "Please enter a valid mileage" })
      )
      .positive(
        intl.formatMessage({
          defaultMessage: "The mileage must be a positive number",
        })
      ),
    registrationDate: yup.string().required(
      intl.formatMessage({
        defaultMessage: "Please enter the registration date",
      })
    ),
  });
}

interface AddVehicleFormProps {
  onSubmit: (data: FormInputs) => void;
  onCancel: () => void;
  error?: string;
}

export function AddVehicleForm(props: AddVehicleFormProps) {
  const intl = useIntl();
  const form = useForm<FormInputs>({ resolver: yupResolver(schema(intl)) });

  const onSubmit = (data: FormInputs) => {
    props.onSubmit({ ...data, mileage: Number(data.mileage) });
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography component="h1" variant="h5" padding={2}>
          <FormattedMessage defaultMessage="Add vehicle" />
        </Typography>
        <Divider />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box padding={2}>
            {/* Fields */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label={<FormattedMessage defaultMessage="Make" />}
                  fullWidth
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  {...form.register("manufacturer")}
                  error={Boolean(form.formState.errors.manufacturer)}
                  helperText={form.formState.errors.manufacturer?.message}
                >
                  <option value="">
                    {intl.formatMessage({
                      defaultMessage: "Select a make",
                    })}
                  </option>
                  {manufacturers().map((make) => {
                    return <option key={make}>{make}</option>;
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={<FormattedMessage defaultMessage="Model" />}
                  fullWidth
                  {...form.register("model")}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={<FormattedMessage defaultMessage="Variant" />}
                  fullWidth
                  {...form.register("type")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label={<FormattedMessage defaultMessage="Fuel type" />}
                  fullWidth
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  {...form.register("fuel")}
                  error={Boolean(form.formState.errors.fuel)}
                  helperText={form.formState.errors.fuel?.message}
                >
                  <option value="">
                    {intl.formatMessage({
                      defaultMessage: "Select a fuel type",
                    })}
                  </option>
                  {fuelTypes().map((type) => {
                    return <option key={type}>{type}</option>;
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label={<FormattedMessage defaultMessage="Colour" />}
                  fullWidth
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  {...form.register("color")}
                  error={Boolean(form.formState.errors.color)}
                  helperText={form.formState.errors.color?.message}
                >
                  <option value="">
                    {intl.formatMessage({
                      defaultMessage: "Select a colour",
                    })}
                  </option>
                  {colors().map((color) => {
                    return (
                      <option key={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={
                    <FormattedMessage defaultMessage="Registration number" />
                  }
                  fullWidth
                  {...form.register("registrationNumber")}
                  error={Boolean(form.formState.errors.registrationNumber)}
                  helperText={form.formState.errors.registrationNumber?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={<FormattedMessage defaultMessage="VIN" />}
                  fullWidth
                  {...form.register("vin")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={<FormattedMessage defaultMessage="Mileage" />}
                  fullWidth
                  {...form.register("mileage")}
                  error={Boolean(form.formState.errors.mileage)}
                  helperText={form.formState.errors.mileage?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  label={
                    <FormattedMessage defaultMessage="Registration date" />
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...form.register("registrationDate")}
                  error={Boolean(form.formState.errors.registrationDate)}
                  helperText={form.formState.errors.registrationDate?.message}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box padding={2}>
            {/* Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={() => {
                    form.reset();
                  }}
                  sx={{ width: { xs: 1, sm: "auto" } }}
                >
                  <FormattedMessage defaultMessage="Reset" />
                </Button>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={props.onCancel}
                  sx={{ width: { xs: 1, sm: "auto" } }}
                >
                  <FormattedMessage defaultMessage="Cancel" />
                </Button>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: { xs: 1, sm: "auto" } }}
                >
                  <FormattedMessage defaultMessage="Submit" />
                </Button>
              </Grid>

              {props.error && (
                <Grid item xs={12}>
                  <Alert severity="error">{props.error}</Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
