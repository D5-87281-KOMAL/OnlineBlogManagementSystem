import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Logo from '../account/logo.png';
import LogoutConfirmation from '../account/LogOut';

const pages = ['Home', 'Contact', 'About Us', 'Login'];

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

function Header1() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const navigate = useNavigate();

  // Handle Opening & Closing of Navigation Menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);


  // Handle Navigation for Pages
  const handleNavigation = (page) => {
    handleCloseNavMenu();
    const routes = {
      'Home': '/',
      'Contact': '/contact',
      'About Us': '/about',
      'Login': '/login',
    };
    if (routes[page]) navigate(routes[page]);
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

  const handleSubscribe = () => navigate('/subscribe');

  return (
    <AppBar position="static" style={{ background: 'orange' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Click to Navigate to Home */}
          <Avatar src={Logo} alt="Logo" sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => navigate('/')} />

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

export default Header1;