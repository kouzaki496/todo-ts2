//src/components/Header/Header.tsx
import React, { useState, useEffect, memo } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, useMediaQuery, useTheme, Avatar, IconButton, Box } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '../Button/Button';
import MenuList from '../MenuList/MenuList';
import { signInWithGoogle } from '../../service/authService';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { Settings, Logout } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// HeaderPropsの定義
export interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = memo(({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Toolbar className="MuiToolbar-header" sx={{ width: '100%', justifyContent: 'flex-end' }}>
          <TaskAltIcon sx={{ marginRight: 1 }} />
          <Typography variant="h4" component="h1" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {subtitle && !isMobile && (
            <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
              {subtitle}
            </Typography>
          )}
          <Box>
            {user ? (
              <>
                <IconButton sx={{ p: 0 }} onClick={handleAvatarClick}>
                  <Avatar alt={user.displayName || 'User'} src={user.photoURL || ''} />
                </IconButton>
                <MenuList
                  position="bottom-right"
                  menuItems={[
                    { label: '設定', icon: <Settings /> },
                    { label: 'ログアウト', icon: <Logout />, onClick: handleSignOut },
                  ]}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                />
              </>
            ) : (
              <Button
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
                onClick={handleSignIn}
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


