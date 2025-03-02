//src/components/Header/Header.tsx
import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
  Box,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, MenuList } from '@/components/index';
import { Settings, Logout } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useMenu } from '@/hooks/useMenu';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = memo(({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, signIn, signOut } = useAuth();
  const { menuOpen, anchorEl, handleMenuOpen, handleMenuClose } = useMenu();

  const menuItems = [
    { label: '設定', icon: <Settings /> },
    { label: 'ログアウト', icon: <Logout />, onClick: signOut },
  ];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Toolbar sx={{ width: '100%', justifyContent: 'flex-end' }}>
          <TaskAltIcon sx={{ mr: 1 }} />
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {subtitle && !isMobile && (
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              {subtitle}
            </Typography>
          )}
          <Box>
            {user ? (
              <>
                <IconButton sx={{ p: 0 }} onClick={handleMenuOpen}>
                  <Avatar alt={user.displayName || 'User'} src={user.photoURL || ''} />
                </IconButton>
                <MenuList
                  position="bottom-right"
                  menuItems={menuItems}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                />
              </>
            ) : (
              <Button
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': { bgcolor: 'secondary.dark' },
                }}
                onClick={signIn}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
});

Header.displayName = 'Header';

export default Header;


