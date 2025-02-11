"use client";

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme'; // カスタムテーマを作成した場合

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}