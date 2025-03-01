import { useState } from 'react';

export const useMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

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