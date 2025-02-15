//src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, useMediaQuery, useTheme, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../Button/Button';
import { signInWithGoogle } from '../../service/authService';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

// HeaderPropsの定義
export interface HeaderProps {
  title: string;
  subtitle?: string;
  // 他のプロパティをここに追加
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
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

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Toolbar sx={{ width: '100%' }}>
          {isMobile ? (
            <MenuIcon />
          ) : (
            <Typography variant="h4" component="h1" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
          )}
          {subtitle && !isMobile && (
            <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
              {subtitle}
            </Typography>
          )}
          <Button color="primary" sx={{ color: theme.palette.common.white }}>Home</Button>
          <Button color="primary" sx={{ color: theme.palette.common.white }}>About</Button>
          <Button color="primary" sx={{ color: theme.palette.common.white }}>Contact</Button>
          {user ? (
            <IconButton sx={{ p: 0 }} onClick={handleSignOut}>
              <Avatar alt={user.displayName || 'User'} src={user.photoURL || ''} />
            </IconButton>
          ) : (
            <Button color="primary" sx={{ color: theme.palette.common.white }} onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;


