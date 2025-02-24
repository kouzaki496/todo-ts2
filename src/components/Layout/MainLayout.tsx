import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from '../Navigation/Sidebar';

const DRAWER_WIDTH = 240;
const HEADER_HEIGHT = 64; // ヘッダーの高さ

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      pt: `${HEADER_HEIGHT}px`,
      '& .MuiToolbar-root': {
        display: 'none',
        '&.MuiToolbar-header': {
          display: 'flex',
        },
      },
    }}>
      {isDesktop && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};