import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Vehicle } from "@/types";

interface VehiclesListProps {
  vehicles: Array<Vehicle>;
}

export function VehiclesList(props: VehiclesListProps) {
  const intl = useIntl();

  return (
    <Paper>
      <Grid container spacing={1} alignItems="center" padding={2}>
        <Grid item>
          <Typography component="h1" variant="h5">
            <FormattedMessage defaultMessage="Vehicles" />
          </Typography>
        </Grid>
        <Grid item xs>
          <Chip
            size="small"
            color="secondary"
            label={<FormattedNumber value={props.vehicles.length} />}
            aria-label={intl.formatMessage({
              defaultMessage: "Count of vehicles",
            })}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="medium"
            startIcon={<AddIcon />}
            component={Link}
            to="/vehicles/add"
          >
            <FormattedMessage defaultMessage="Add vehicle" />
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <List component="div">
        {props.vehicles.map((vehicle, index, arr) => {
          return (
            <ListItemButton
              key={vehicle.id}
              component={Link}
              to={`/vehicles/${vehicle.id}`}
              divider={index < arr.length - 1}
            >
              <ListItemText
                primary={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`}
                secondary={vehicle.registrationNumber}
              />
              <ChevronRightIcon color="action" />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}

export function VehiclesListLoading() {
  const intl = useIntl();

  return (
    <Paper
      aria-label={intl.formatMessage({
        defaultMessage: "Loading vehicle list",
      })}
    >
      <List>
        {[...Array(25).keys()].map((key) => {
          return (
            <ListItem key={key} divider>
              <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
