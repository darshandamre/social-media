import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#262626"
    },
    primary: {
      main: "#6DD5FA",
      light: "#63FDD2",
      contrastText: "rgba(0, 0, 0, 0.87)"
    },
    secondary: {
      main: "#f50057"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.85)"
    }
  }
});
