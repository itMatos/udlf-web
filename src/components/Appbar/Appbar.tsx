'use client';
import { Menu } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TerminalIcon from '@mui/icons-material/Terminal';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

export default function Appbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleNavigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <Box component={'div'} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-label="menu" color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography color="inherit" component="div" variant="h6">
            UDLF Web
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" onClose={toggleDrawer} open={openDrawer}>
        <Typography sx={{ padding: 2 }} variant="h6">
          Menu UDLF Web
        </Typography>
        <Box onClick={toggleDrawer} onKeyDown={toggleDrawer} role="presentation" sx={{ width: 300 }}>
          <Box sx={{ padding: 2 }}>
            <Button onClick={() => handleNavigateTo('/')} startIcon={<HomeIcon />} variant="text">
              Home
            </Button>
            <Button onClick={() => handleNavigateTo('/get-started')} startIcon={<NoteAddIcon />} variant="text">
              Create new config file
            </Button>
            <Button onClick={() => handleNavigateTo('/load-config')} startIcon={<TerminalIcon />} variant="text">
              Run config file
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
