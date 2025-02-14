import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Logo from '../account/logo.png';
import  {ThemeSwitcher}  from './ThemeSwitcher';
import LogoutConfirmation from '../account/LogOut';
import { useState } from 'react';


const pages = ['Home', 'Contact', 'About Us'];
const settings = ['Profile', 'Your Posts', 'Logout'];

// Styled Subscribe Button with Hover Effects
const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF5722',
  color: '#fff',
  marginRight: '20px',
  padding: '10px',
  '&:hover': {
    backgroundColor: '#E64A19',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const navigate = useNavigate();
  console.log(localStorage.getItem('id'));
  console.log(localStorage.getItem('accessToken'));
  console.log(localStorage.getItem('profilePicture'));
  

  // Handle Opening & Closing of Navigation Menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);



  // Handle Navigation for Pages
  const handleNavigation = (page) => {
    handleCloseNavMenu();
    const routes = {
      'Home': '/home',
      'Contact': '/contact',
      'About Us': '/about',

    };
    if (routes[page]) navigate(routes[page]);
  };


  const handleUserNavigation = (option) => {
    handleCloseUserMenu();
    if (option === 'Logout') {
      setLogoutOpen(true); // Open the logout confirmation dialog
    } else {
      const routes = {
        'Profile': '/profile',
        'Your Posts': '/your-posts',
      };
      if (routes[option]) navigate(routes[option]);
    }
  };


   // Handle Logout Confirmation
   const handleLogoutConfirm = () => {
    setLogoutOpen(false); // Close the dialog
    navigate('/'); // Navigate to the login page or perform logout logic
  };


  // Handle Logout Cancel
  const handleLogoutCancel = () => {
    setLogoutOpen(false); // Close the dialog
  };


  const handleSubscribe = () => navigate('/pay');

  return (
    <AppBar position="static" style={{ background: 'orange' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Click to Navigate to Home */}
          <Avatar src={Logo} alt="Logo" sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => navigate('/home')} />

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={() => handleNavigation(page)} sx={{ my: 2, color: 'white' }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* Subscribe Button */}
          <SubscribeButton onClick={handleSubscribe}>Subscribe</SubscribeButton>

          {/* User Avatar & Settings Menu */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Profile" src={localStorage.getItem('profilePicture')} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: '45px' }}
          >
            {settings.map((option) => (
              <MenuItem key={option} onClick={() => handleUserNavigation(option)}>
                <Typography textAlign="center">{option}</Typography>
              </MenuItem>
            ))}
            <MenuItem>
              <ThemeSwitcher />
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
       {/* Logout Confirmation Dialog */}
       <LogoutConfirmation
        open={logoutOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </AppBar>
  );
}

export default Header;
