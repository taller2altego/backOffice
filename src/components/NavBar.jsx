import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BuildIcon from "@mui/icons-material/Build";
import ListIcon from "@mui/icons-material/List";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useSelector } from "react-redux";

const NavBar = ({ buttonDarkMode, username }) => {
  const [statee, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...statee, [anchor]: open });
  };

  return (
    <>
      <div>
        <React.Fragment key={"left"}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Fiuber
                </Typography>
                <>{buttonDarkMode}</>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={"left"}
            open={statee["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("anchor", false)}
            >
              <Box>
                <List>
                  <AppBar
                    position="fixed"
                    color="primary"
                    sx={{ top: 0, left: 0, width: 250, height: 65 }}
                  >
                    <ListItemButton component="a" href="/">
                      <ListItemIcon sx={{ fontSize: 20 }}>
                        <HomeIcon />{" "}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ my: 0 }}
                        primary="Fiuber BackOffice"
                        primaryTypographyProps={{
                          fontSize: 20,
                          fontWeight: "medium",
                          letterSpacing: 0,
                        }}
                      />
                    </ListItemButton>
                  </AppBar>
                  <Divider />
                  <ListItem
                    button
                    key={"usuarios"}
                    component="a"
                    href="/"
                    sx={{ mt: 8 }}
                  >
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Usuarios"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"cotizacion"}
                    component="a"
                    href="/cotizacion"
                  >
                    <ListItemIcon>
                      <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Cotizacion"} />
                  </ListItem>
                </List>
              </Box>

              <Divider />
              <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, left: 0, width: 250 }}
              >
                <List alignItems="flex-start">
                  <ListItem alignItem="flex-end">
                    <ListItemIcon fontSize="large">
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={username} />
                  </ListItem>
                </List>
              </AppBar>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};

export default NavBar;
