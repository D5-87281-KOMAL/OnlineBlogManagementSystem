import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Account, AccountPreview, AccountPopoverFooter, SignOutButton } from '@toolpad/core/Account';
import Category from './CategoryAdmin'; // Import Category component
import UserManagement from './UserManagement';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommentSection from './CommentManagement';
import CategoryIcon from '@mui/icons-material/Category';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CommentIcon from '@mui/icons-material/Comment';
import PostManagement from './PostManagement';
import HopeUI from './Dashboard';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    segment: 'bloggers',
    title: 'User Management',
    path: '/bloggers',
    icon:<ManageAccountsIcon/>
  },
  // {
  //   segment: 'commentManagement',
  //   title: 'Comment Management',
  //   path: '/comment-management',
  //   icon:<CommentIcon/>
  // },
  {
    segment: 'post',
    title: 'Post Management',
    path: '/post',
    icon:<DynamicFeedIcon/>
  },
  // {
  //   segment: 'subscriptionStatus',
  //   title: 'Subscription Status',
  //   path: '/subscription-status',
  //   icon:<SubscriptionsIcon/>
  // },
  {
    segment: 'category',
    title: 'Category Management',
    path: '/category',
    icon:<CategoryIcon/>
  },
  {
    segment: 'comment',
    title: 'Comment Management',
    path: '/comment',
    icon:<CategoryIcon/>
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  let content;

  switch (pathname) {
    case '/dashboard':
      content = <HopeUI/>;
      break;
    case '/bloggers':
      content = <UserManagement/>;
      break;
    case '/comment':
      content = <CommentSection/>;
      break;
    case '/post':
      content = <PostManagement/>;
      break;
    case '/subscription-status':
      content = 'Subscription Status content';
      break;
    case '/category':
      content = <Category />; // Render the Category component
      break;
    default:
      content = 'Page not found';
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>{content}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

function SidebarFooterAccountPopover({ session, setSession }) {
  const handleSignOut = () => {
    setSession(null);
    localStorage.getItem('user');
    localStorage.getItem('accessToken');
    localStorage.getItem('role');
    localStorage.getItem('expirationTime');
    localStorage.getItem('id');
    localStorage.getItem('profilePicture');
  };

  return (
    // <Stack direction="column">
    //   <Typography variant="body2" mx={2} mt={1}>
    //     Account
    //   </Typography>
    //   <MenuList>
    //     <MenuItem
    //       component="button"
    //       sx={{ justifyContent: 'flex-start', width: '100%', columnGap: 2 }}
    //     >
    //       <ListItemIcon>
    //         <Avatar
    //           sx={{ width: 32, height: 32, fontSize: '0.95rem', bgcolor: '#4CAF50' }}
    //           alt={session.user.name}
    //         >
    //           {session.user.name[0]}
    //         </Avatar>
    //       </ListItemIcon>
    //       <ListItemText
    //         sx={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'flex-start',
    //           width: '100%',
    //         }}
    //         primary={session.user.name}
    //         secondary={session.user.email}
    //         primaryTypographyProps={{ variant: 'body2' }}
    //         secondaryTypographyProps={{ variant: 'caption' }}
    //       />
    //     </MenuItem>
    //   </MenuList>
    //   <Divider />
    //   <AccountPopoverFooter>
    //     <SignOutButton onClick={handleSignOut} />
    //   </AccountPopoverFooter>
    // </Stack>
    <></>
  );
}

// SidebarFooterAccountPopover.propTypes = {
//   session: PropTypes.object,
//   setSession: PropTypes.func.isRequired,
// };

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini, session, setSession }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: () => <SidebarFooterAccountPopover session={session} setSession={setSession} />,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
  session: PropTypes.object,
  setSession: PropTypes.func.isRequired,
};

function DashboardLayoutAccountSidebar(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');
  const [session, setSession] = React.useState(() => {
    const user = localStorage.getItem('user');
    return user ? { user: JSON.parse(user) } : null;
  });

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  // const authentication = React.useMemo(() => {
  //   return {
  //     signIn: async (email, password) => {
  //       // Simulate a sign-in API call
  //       const response = await fetch('/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });

  //       if (response.ok) {
  //         const user = await response.json();
  //         setSession({ user });
  //         localStorage.setItem('user', JSON.stringify(user));
  //       } else {
  //         throw new Error('Login failed');
  //       }
  //     },
  //     signOut: () => {
  //       setSession(null);
  //       localStorage.removeItem('user');
  //     },
  //   };
  // }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      // authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{ toolbarAccount: () => null, sidebarFooter: () => <SidebarFooterAccount mini={false} session={session} setSession={setSession} /> }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;




