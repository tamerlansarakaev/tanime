import { createTheme } from "@mui/material";

export const inputTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          padding: "0",
        },
        root: {
          borderRadius: "8px",
          border: "3px solid #ff494975",
          color: "#fff",
          padding: "6px 35px 6px 10px",
        },
      },
    },
  },
});
