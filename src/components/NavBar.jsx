import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import { useSelector } from "react-redux";


const NavBar = ({ buttonDarkMode }) => {

  const [state, setState] = useState({left: false,});
  const currentUserData = useSelector((store) => store.userData);
  const [user, setUSer] = useState(currentUserData);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    console.log(currentUserData)
  },[user])

  return (
    <>
      <div>
        <React.Fragment key={'left'}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={
                    toggleDrawer('left', true)
                  }
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  PSA
                </Typography>
              <>
              {buttonDarkMode}
              </>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={
                toggleDrawer("left", false)
              }
              onKeyDown={toggleDrawer("anchor", false)}
            >
              <Box>
                <List>
                  <AppBar position="fixed" color="primary" sx={{top:0,  left:0,  width: 250, height: 65  }} >
                    <ListItemButton component="a" href="/">
                      <ListItemIcon sx={{ fontSize: 20 }}><HomeIcon/> </ListItemIcon>
                      <ListItemText
                        sx={{ my: 0 }}
                        primary="PSA"
                        primaryTypographyProps={{
                          fontSize: 20,
                          fontWeight: 'medium',
                          letterSpacing: 0,
                        }}
                      />                  
                    </ListItemButton> 
                  </AppBar>
                  <Divider />               
                  <ListItem button key={"proyectos"} component="a" href="/proyectos-list" sx={{mt:8}}>
                    <ListItemIcon><ListIcon /></ListItemIcon>
                    <ListItemText primary={"Proyectos"} />
                  </ListItem>
                  <ListItem button key={"soporte"} component="a" href="/soporte">
                    <ListItemIcon><BuildIcon /></ListItemIcon>
                    <ListItemText primary={"Soporte"} />
                  </ListItem>
                </List>
              </Box>
              
              
              <Divider /> 
              <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, left:0,  width: 250,  }} >
                
                <List alignItems="flex-start">
                  <ListItem alignItem ='flex-end' >
                    <ListItemIcon  fontSize="large" ><AccountCircleIcon/></ListItemIcon>
                    <ListItemText primary={ user.name } />
                  </ListItem>
                </List>
                
              </AppBar>
                
              </Box> 
            
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

export default NavBar;