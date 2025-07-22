import { AppBar, Toolbar, Box } from "@mui/material";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <AppBar position="static" color="secondary" elevation={1}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;