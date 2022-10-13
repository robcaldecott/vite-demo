import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Stack direction="column" spacing={8} alignItems="center">
      <Typography component="h1" variant="h3" align="center">
        <FormattedMessage defaultMessage="Welcome to Vite" />
      </Typography>

      <img src="/vite.svg" alt="Vite logo" width={200} />

      <Button variant="contained" component={Link} to="/vehicles">
        <FormattedMessage defaultMessage="Go to vehicles page" />
      </Button>
    </Stack>
  );
}
