import { FormattedMessage } from "react-intl";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteVehicleDialogProps {
  open: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export function DeleteVehicleDialog(props: DeleteVehicleDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        <FormattedMessage defaultMessage="Delete vehicle" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          <FormattedMessage defaultMessage="Are you sure you want to delete this vehicle?" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="secondary" onClick={props.onClose}>
          <FormattedMessage defaultMessage="Cancel" />
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          onClick={props.onDelete}
        >
          <FormattedMessage defaultMessage="Delete" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
