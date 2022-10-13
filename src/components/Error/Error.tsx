import { FormattedMessage } from "react-intl";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export function Error(props: ErrorProps) {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2 }}>
        <Stack direction="column" spacing={4} alignItems="center">
          <ErrorIcon color="error" sx={{ fontSize: 64 }} />

          <Typography component="h1" variant="h5" align="center">
            <FormattedMessage defaultMessage="Oops! Something has gone wrong!" />
          </Typography>

          <Alert severity="error" icon={false} sx={{ width: 1 }}>
            {props.message}
          </Alert>

          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={props.onRetry}
          >
            <FormattedMessage defaultMessage="Try again" />
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
