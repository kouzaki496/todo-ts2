import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { LAYOUT } from '../../constants/layout';
import { Header } from '@/components';
import { Sidebar } from '@/components/Navigation/Sidebar';
/**
 * アプリケーションのメインレイアウトコンポーネント
 *
 * 役割:
 * - アプリケーションのメインUI構造を定義
 * - ヘッダー、サイドバーなどの配置
 * - コンテンツ領域のレイアウト
 * - アプリケーションの「内枠」を形成
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="My Todo App" />
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        {isDesktop && <Sidebar />}
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
    </Box>
  );
};