import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, IconButton, Toolbar, useColorScheme } from "@mui/material";
import { lightBlue, yellow } from "@mui/material/colors";
import logo from "./logo.svg";

export function AppHeader() {
  const { mode, setMode } = useColorScheme();
  const intl = useIntl();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      enableColorOnDark
      sx={{
        backgroundColor: "secondary.main",
        color: "common.white",
        "[data-mui-color-scheme='dark'] &": {
          backgroundColor: "primary.dark",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "inline-flex" }}>
          <img src={logo} alt="Zego logo" />
        </Link>

        <IconButton
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
          aria-label={intl.formatMessage({ defaultMessage: "Switch theme" })}
        >
          {mode === "light" ? (
            <DarkModeIcon sx={{ color: lightBlue["100"] }} />
          ) : (
            <LightModeIcon sx={{ color: yellow["A200"] }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
