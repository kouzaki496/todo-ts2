"use client";

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import './globals.css';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { MainLayout } from '../components/layout/MinLayout/MainLayout';
import { AuthProvider } from '@/hooks/useAuth';
/**
 * アプリケーション全体のレイアウト
 *
 * 役割:
 * - HTML構造の定義
 * - グローバルプロバイダーの設定（Theme, Auth）
 * - すべてのページに共通する要素の配置
 * - アプリケーションの「外枠」を形成
 */

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