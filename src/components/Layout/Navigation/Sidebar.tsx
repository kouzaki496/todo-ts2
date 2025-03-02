import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { LAYOUT } from '@/constants/layout';

interface SidebarProps {
  selectedCount?: number;
  disabled?: boolean;
}

export const Sidebar = ({ selectedCount = 0, disabled }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: LAYOUT.DRAWER_WIDTH,
        flexShrink: 0,
        pointerEvents: disabled ? 'none' : 'auto',
        '& .MuiDrawer-paper': {
          width: LAYOUT.DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
          top: LAYOUT.HEADER_HEIGHT,
          height: `calc(100% - ${LAYOUT.HEADER_HEIGHT}px)`,
          opacity: disabled ? 0.3 : 1,
        },
        '& .MuiToolbar-root': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected
              disabled={disabled}
              sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="すべてのタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disabled={disabled}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="重要(未実装)" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton disabled={disabled}>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="今日(未実装)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disabled={disabled}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="完了済み(未実装)" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;