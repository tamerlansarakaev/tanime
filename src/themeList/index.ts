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
          background: "#000",
          color: "#fff",
          padding: "5px 10px",
        },
      },
    },
  },
});
