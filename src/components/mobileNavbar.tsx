import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Home, ShoppingBag, CircleHelp, Phone, User } from "lucide-react";

const MobileNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      // If no access token, redirect to login page
      window.location.href = "/login";
    } else {
      // If access token exists, open the menu
      setAnchorEl(event.currentTarget);
    }
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        top: "auto",
        left: "0",
        right: "0",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        zIndex: 10,
      }}
    >
      {/* Home Icon */}
      <IconButton onClick={() => window.location.href = "/"} aria-label="Home">
        <Home size={24} />
      </IconButton>

      {/* Shop Icon */}
      <IconButton onClick={() => window.location.href = "/shop"} aria-label="Shop">
        <ShoppingBag size={24} />
      </IconButton>

      {/* FAQ Icon */}
      <IconButton onClick={() => window.location.href = "/faq"} aria-label="FAQ">
        <CircleHelp size={24} />
      </IconButton>

      {/* Contact Us Icon */}
      <IconButton onClick={() => window.location.href = "/contact-us"} aria-label="Contact Us">
        <Phone size={24} />
      </IconButton>

      {/* User Icon */}
      <IconButton onClick={handleUserClick} aria-label="User">
        <User size={24} />
      </IconButton>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ "& .MuiPaper-root": { borderRadius: "10px", minWidth: "200px" } }}
      >
        <MenuItem onClick={() => { handleClose(); window.location.href = "/mylikes"; }}>
          Like
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); window.location.href = "/mysaved"; }}>
          Bookmark
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); window.location.href = "/mybooking"; }}>
          Booked Services
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); window.location.href = "/profile"; }}>
          Profile
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MobileNavbar;
