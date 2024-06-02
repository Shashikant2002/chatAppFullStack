import { createTheme } from "@mui/material/styles";
import { primary, primaryLight } from "../../config";

export const theme = createTheme({
  palette: {
    theme: "dark",
    primary: {
      light: primaryLight,
      main: primary,
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
  },
});
