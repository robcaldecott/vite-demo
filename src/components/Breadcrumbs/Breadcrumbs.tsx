import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";

interface BreadcrumbsProps {
  label?: ReactNode;
  gutterBottom?: boolean;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs sx={{ mb: props.gutterBottom ? 2 : 0 }}>
      <Link component={RouterLink} to="/">
        <FormattedMessage defaultMessage="Home" />
      </Link>

      {/* We cannot use fragments here */}
      {props.label && (
        <Link component={RouterLink} to="/vehicles">
          <FormattedMessage defaultMessage="Vehicles" />
        </Link>
      )}

      {props.label && <Typography>{props.label}</Typography>}

      {!props.label && (
        <Typography>
          <FormattedMessage defaultMessage="Vehicles" />
        </Typography>
      )}
    </MuiBreadcrumbs>
  );
}
