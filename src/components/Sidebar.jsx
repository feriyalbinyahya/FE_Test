import { Link, useLocation } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import logo from "../assets/images/logo.png";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/laporan", label: "Laporan Lalin" },
    { to: "/gerbang", label: "Master Gerbang" },
  ];

  return (
    <Box sx={{ width: 220, bgcolor: "primary.main", p: 2, height: "100%" }}>
      <Box component="img" src={logo} alt="Logo" sx={{ width: 120 }} />

      <List>
        {links.map((link) => {
            const isActive = pathname === link.to;
            return(
            
          <ListItem key={link.to} disablePadding>
            <ListItemButton
              component={Link}
              to={link.to}
              selected={isActive}
              sx={{
                bgcolor: isActive ? "secondary.main" : "transparent",
                borderRadius: 2, // border radius saat aktif
                "&:hover": {
                bgcolor: isActive ? "primary.main" : "secondary.main",
                borderRadius: 2,
                },
                mx: 1, // sedikit margin kiri-kanan biar border radius terlihat
            }}
            >
              <ListItemText primary={link.label} 
              primaryTypographyProps={{
                sx: {
                color: "white", // Ubah warna teks di sini
                fontWeight:isActive ? "bold" : "normal",
                },
            }} />
            </ListItemButton>
          </ListItem>
        )}
        )}
      </List>
    </Box>
  );
};

export default Sidebar;