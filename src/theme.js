import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    
  },
  palette: {
    primary: {
      main: "#113F67", // contoh: biru terang
    },
    secondary:{
        main: "#34699A"
    }
  },
});

export default theme;