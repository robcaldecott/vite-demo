import { experimental_extendTheme as extendTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ZEGO_GREEN = "#46E18C";
const ZEGO_PURPLE = "#371987";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: ZEGO_GREEN,
        },
        secondary: {
          main: ZEGO_PURPLE,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: ZEGO_PURPLE,
        },
        secondary: {
          main: ZEGO_GREEN,
        },
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
});
