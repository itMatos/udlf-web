import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }} component={"div"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            UDLF Web
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
