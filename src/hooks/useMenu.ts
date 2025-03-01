// src/hooks/useMenu.ts
import { useState } from 'react';

/**
 * メニュー操作のためのカスタムフック
 *
 * 役割:
 * - メニューの開閉状態の管理
 * - メニューのアンカー要素の管理
 * - メニュー操作のためのハンドラー関数の提供
 *
 * @returns メニュー状態と操作関数
 */
export const useMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * メニューを開くハンドラー
   * @param event クリックイベント
   */
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  /**
   * メニューを閉じるハンドラー
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return {
    menuOpen,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
  };
};