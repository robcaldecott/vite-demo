import { ReactNode } from "react";
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  useIntl,
} from "react-intl";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";
import { Vehicle } from "@/types";

interface VehicleListItemProps {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

function VehicleListItem(props: VehicleListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemText
        primary={props.label}
        primaryTypographyProps={{ id: props.id, fontWeight: "medium" }}
        secondary={props.value}
        secondaryTypographyProps={{ "aria-labelledby": props.id }}
      />
    </ListItem>
  );
}

interface VehicleColourProps {
  color: string;
}

function VehicleColour(props: VehicleColourProps) {
  return (
    <Stack component="span" direction="row" spacing={1} alignItems="center">
      <Box
        component="span"
        sx={{
          height: 16,
          width: 16,
          borderRadius: "50%",
          backgroundColor: props.color.replace(/ /g, ""),
          border: 1,
          borderColor: "divider",
        }}
      />
      <span>{props.color.charAt(0).toUpperCase() + props.color.slice(1)}</span>
    </Stack>
  );
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onDelete: () => void;
}

export function VehicleDetails(props: VehicleDetailsProps) {
  return (
    <Card>
      <CardHeader
        title={`${props.vehicle.manufacturer} ${props.vehicle.model} ${props.vehicle.type}`}
        subheader={props.vehicle.registrationNumber}
      />
      <Divider />
      <CardContent>
        <List disablePadding>
          <VehicleListItem
            id="color"
            label={<FormattedMessage defaultMessage="Colour" />}
            value={<VehicleColour color={props.vehicle.color} />}
          />
          <VehicleListItem
            id="fuel"
            label={<FormattedMessage defaultMessage="Fuel" />}
            value={props.vehicle.fuel}
          />
          <VehicleListItem
            id="vin"
            label={<FormattedMessage defaultMessage="VIN" />}
            value={props.vehicle.vin}
          />
          <VehicleListItem
            id="mileage"
            label={<FormattedMessage defaultMessage="Mileage" />}
            value={<FormattedNumber value={props.vehicle.mileage} />}
          />
          {props.vehicle.registrationDate && (
            <VehicleListItem
              id="date"
              label={<FormattedMessage defaultMessage="Registration date" />}
              value={
                <FormattedDate
                  value={props.vehicle.registrationDate}
                  dateStyle="full"
                />
              }
            />
          )}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          // variant="outlined"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          onClick={props.onDelete}
        >
          <FormattedMessage defaultMessage="Delete vehicle" />
        </Button>
      </CardActions>
    </Card>
  );
}

export function VehicleDetailsLoading() {
  const intl = useIntl();

  return (
    <Card
      aria-label={intl.formatMessage({
        defaultMessage: "Loading vehicle details",
      })}
    >
      <CardHeader title={<Skeleton />} subheader={<Skeleton />} />
      <Divider />
      <CardContent>
        {Array.from(Array(16).keys()).map((key) => (
          <Skeleton key={key} />
        ))}
      </CardContent>
    </Card>
  );
}
