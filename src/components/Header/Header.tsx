//src/components/Header/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../Button/Button';

// HeaderPropsの定義
export interface HeaderProps {
  title: string;
  subtitle?: string;
  // 他のプロパティをここに追加
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;


