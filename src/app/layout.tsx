"use client";

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import './globals.css';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { MainLayout } from '../components/Layout/MainLayout';
import { AuthProvider } from '../hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AppRouterCacheProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </AppRouterCacheProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}