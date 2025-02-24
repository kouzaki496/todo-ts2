import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { LAYOUT } from '../../constants/layout';

interface BulkActionBarProps {
  isBulkDeleteMode: boolean;
  onToggleBulkDeleteMode: () => void;
  onSelectAll: () => void;
  onSelectCompleted: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  isBulkDeleteMode,
  onToggleBulkDeleteMode,
  onSelectAll,
  onSelectCompleted,
  onClearSelection,
  onBulkDelete,
  selectedCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const actions = [
    { icon: <SelectAllIcon />, name: '全て選択', onClick: onSelectAll },
    { icon: <CheckCircleIcon />, name: '完了済みを選択', onClick: onSelectCompleted },
    { icon: <ClearIcon />, name: '選択解除', onClick: onClearSelection },
    {
      icon: <DeleteSweepIcon />,
      name: `選択したタスクを削除 (${selectedCount})`,
      onClick: onBulkDelete,
      disabled: selectedCount === 0
    },
  ];

  return (
    <SpeedDial
      ariaLabel="一括操作メニュー"
      direction="down"
      sx={{
        position: 'fixed',
        top: LAYOUT.HEADER_HEIGHT + 20,
        right: 16,
        '& .MuiSpeedDial-fab': {
          width: 48,
          height: 48,
          bgcolor: isBulkDeleteMode ? 'error.main' : 'primary.main',
          '&:hover': {
            bgcolor: isBulkDeleteMode ? 'error.dark' : 'primary.dark',
          },
        },
        '& .MuiSpeedDial-actions': {
          paddingTop: 1,
          gap: 1,
          marginTop: 1,
        },
        zIndex: 1,
      }}
      icon={
        <Badge badgeContent={selectedCount} color="secondary">
          <SpeedDialIcon
            icon={<DeleteSweepIcon />}
            openIcon={<CloseIcon />}
          />
        </Badge>
      }
      open={isBulkDeleteMode}
      onClick={onToggleBulkDeleteMode}
    >
      {isBulkDeleteMode && actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick();
          }}
          FabProps={{
            disabled: action.disabled,
          }}
          sx={{
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
            },
          }}
        />
      ))}
    </SpeedDial>
  );
};