import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#5A0C07" },
    secondary: { main: "#F2EDEC" },
    background: { default: "#F2EDEC", paper: "#fff" },
    text: { primary: "#1D1D1D" },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F2EDEC" },
    secondary: { main: "#5A0C07" },
    text: { primary: "#fff", secondary: "#bbb" },
    background: {
      default: "linear-gradient(to bottom, #431512, #000000)", // degradê
      paper: "#1D1D1D",
    },
  },
});
