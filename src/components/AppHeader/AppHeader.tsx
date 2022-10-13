import { ReactNode, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  useColorScheme,
} from "@mui/material";
import { lightBlue, yellow } from "@mui/material/colors";
import { useLocale } from "@/providers/LocaleProvider";
import logo from "./logo.svg";
import "flag-icons/css/flag-icons.min.css";

function getFlagIcon(locale: string) {
  switch (locale) {
    case "fr-FR":
      return "fi-fr";
    default:
      return "fi-gb";
  }
}

interface Locale {
  locale: string;
  name: ReactNode;
  icon: string;
}

const locales: Array<Locale> = [
  {
    locale: "en-GB",
    name: <FormattedMessage defaultMessage="English" />,
    icon: "fi-gb",
  },
  {
    locale: "fr-FR",
    name: <FormattedMessage defaultMessage="French" />,
    icon: "fi-fr",
  },
];

export function AppHeader() {
  const { mode, setMode } = useColorScheme();
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleCloseMenu = () => setAnchorEl(null);

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

        <Box>
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

          <IconButton
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            aria-label="Select language"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Box
              className={`fi fis ${getFlagIcon(locale)}`}
              height={24}
              width={24}
              borderRadius={4}
            />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {locales.map((locale) => {
              return (
                <MenuItem
                  key={locale.locale}
                  onClick={() => {
                    handleCloseMenu();
                    setLocale(locale.locale);
                  }}
                >
                  <ListItemIcon>
                    <span className={`fi ${locale.icon}`} />
                  </ListItemIcon>
                  <ListItemText>{locale.name}</ListItemText>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
