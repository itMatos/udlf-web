"use client";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function Appbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"div"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            UDLF Web
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Menu UDLF Web
        </Typography>
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <Box sx={{ padding: 2 }}>
            <Button variant="text" startIcon={<HomeIcon />} onClick={() => (window.location.href = "/")}>
              Home
            </Button>
            <Button variant="text" onClick={() => (window.location.href = "/get-started")} startIcon={<NoteAddIcon />}>
              Create new config file
            </Button>
            <Button variant="text" onClick={() => (window.location.href = "/load-config")} startIcon={<TerminalIcon />}>
              Run config file
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
