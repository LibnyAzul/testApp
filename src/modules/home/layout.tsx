import React, { FC, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { customDispatch, customSelector } from 'hooks/redux';
import { Logout } from 'shared/redux/slices/auth';
import { AppBar, DrawerFooter, DrawerHeader, Main } from 'styles/Layout';
import CustomAlerts, {
  initialState as startAlert
} from 'shared/utils/components/alerts';
import { setCustomAlert } from 'shared/redux/slices/alerts';
import { LogoStyled } from 'styles/LoginScreen';

interface IPosition {
  open: boolean;
  isOpen: boolean;
}

const Layout: FC = () => {
  const [position, setPosition] = useState<IPosition>({
    open: false,
    isOpen: false
  });
  const {
    alerts: { customAlert },
    auth: { isAuthenticated },
    user
  } = customSelector((state) => state);
  const showUserCatalog = user.is_superuser !== undefined && user.is_superuser;
  const showVehicleCatalog =
    (user.is_superuser !== undefined && user.is_superuser) ||
    (user.is_staff !== undefined && user.is_staff);
  const theme = useTheme();
  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = customDispatch();

  const handleClick = (): void => {
    setPosition({ ...position, isOpen: !position.isOpen });
  };

  const handleDrawerOpen = (): void => {
    setPosition({ ...position, open: true });
  };

  const handleDrawerClose = (): void => {
    setPosition({ ...position, open: false });
  };

  const goToPage = (type: string): void => {
    handleDrawerClose();
    let path = '';
    switch (type) {
      case 'home':
        path = '/';
        break;
      case 'user':
      case 'vehicle':
        handleClick();
        path = `/entity/${type}`;
        break;
      case 'customize':
        path = `/${type}`;
        break;
      default:
        void dispatch(Logout());
        path = '/login';
        break;
    }
    navigate(path);
  };

  const closeAlert = (): void => {
    void dispatch(setCustomAlert(startAlert));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      void dispatch(Logout());
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={position.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(position.open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user.name.substring(0, 2)}
          </Avatar>
          <Typography variant="h6" noWrap component="div" sx={{ pl: 1 }}>
            {user.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
        variant="persistent"
        anchor="left"
        open={position.open}
      >
        <DrawerHeader
          style={{
            background:
              'linear-gradient(129deg, rgb(11 222 243 / 62%) 46.35%, rgb(79 108 205) 100%)'
          }}
        >
          <LogoStyled />
          <IconButton onClick={handleDrawerClose} sx={{ ml: 3 }}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton id="home" onClick={() => goToPage('home')}>
            <ListItemIcon>
              <HomeTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <BackupTableIcon />
            </ListItemIcon>
            <ListItemText primary="Catalogos" />
            {position.isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={position.isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {showUserCatalog ? (
                <>
                  <ListItemButton
                    id="user"
                    sx={{ pl: 4 }}
                    onClick={() => goToPage('user')}
                  >
                    <ListItemIcon>
                      <GroupRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}

              {showVehicleCatalog ? (
                <>
                  <ListItemButton
                    id="user"
                    sx={{ pl: 4 }}
                    onClick={() => goToPage('vehicle')}
                  >
                    <ListItemIcon>
                      <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vehículos" />
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}
            </List>
          </Collapse>
        </List>
        <ListItemButton id="Space" disabled sx={{ mb: 5 }} />
        <Divider />
        <DrawerFooter>
          <List component="div" disablePadding>
            {/* <ListItemButton
              id="customize"
              onClick={() => goToPage('customize')}
            >
              <ListItemIcon>
                <TuneRoundedIcon />
                <>&nbsp;&nbsp;</>
                <ListItemText primary="Personalizar" />
              </ListItemIcon>
            </ListItemButton> */}
            <ListItemButton id="login" onClick={() => goToPage('login')}>
              <ListItemIcon sx={{ '&:hover': { color: '#f00' } }}>
                <MeetingRoomTwoToneIcon />
                <>&nbsp;&nbsp;</>
                <ListItemText primary="Cerrar sesión" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        </DrawerFooter>
        {/* Other Section */}
      </Drawer>
      <Main open={position.open}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <CustomAlerts params={customAlert} closeAlert={closeAlert} />
    </Box>
  );
};

export default Layout;
