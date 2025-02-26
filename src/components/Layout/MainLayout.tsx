import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from '../Navigation/Sidebar';
import { LAYOUT } from '../../constants/layout';

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
      pt: `${LAYOUT.HEADER_HEIGHT}px`,
      '& .MuiToolbar-root': {
        display: 'none',
        '&.MuiToolbar-header': {
          display: 'flex',
        },
      },
    }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: { xs: 1, sm: 2, md: 3 },
          width: { md: `calc(100% - ${LAYOUT.DRAWER_WIDTH}px)` },
          minHeight: '100%',
          maxWidth: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};