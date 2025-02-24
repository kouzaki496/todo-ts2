import React from 'react';
import AddTodoButton from '../AddTodoButton/AddTodoButton';
import { Box, Fab, SpeedDial, SpeedDialAction } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';

interface FloatingActionsProps {
  onAddClick?: () => void;
  onBulkDeleteClick?: () => void;
  onSelectAll?: () => void;
  onSelectCompleted?: () => void;
  onClearSelection?: () => void;
  onBulkDelete?: () => void;
  disabled?: boolean;
  isBulkDeleteMode?: boolean;
  selectedCount?: number;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onAddClick,
  onBulkDeleteClick,
  onSelectAll,
  onSelectCompleted,
  onClearSelection,
  onBulkDelete,
  disabled,
  isBulkDeleteMode,
  selectedCount = 0,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      <SpeedDial
        ariaLabel="Bulk actions"
        icon={<DeleteSweepIcon />}
        direction="up"
        onClick={onBulkDeleteClick}
        open={isBulkDeleteMode}
        FabProps={{
          color: "primary",
          sx: {
            bgcolor: 'primary.main',
            '&:hover': {
              opacity: isBulkDeleteMode ? 1 : 1
            }
          }
        }}
        sx={{
          position: 'absolute',
          bottom: 80,
          '& .MuiSpeedDial-actions': {
            gap: 1,
            position: 'absolute',
            bottom: '100%',
            paddingBottom: 6,
          }
        }}
      >
        <SpeedDialAction
          icon={<SelectAllIcon />}
          tooltipTitle="すべて選択"
          onClick={(e) => {
            e.stopPropagation();
            onSelectAll?.();
          }}
        />
        <SpeedDialAction
          icon={<CheckCircleIcon />}
          tooltipTitle="完了済みを選択"
          onClick={(e) => {
            e.stopPropagation();
            onSelectCompleted?.();
          }}
        />
        <SpeedDialAction
          icon={<ClearIcon />}
          tooltipTitle="選択解除"
          onClick={(e) => {
            e.stopPropagation();
            onClearSelection?.();
          }}
        />
        {selectedCount > 0 && (
          <SpeedDialAction
            icon={<DeleteSweepIcon />}
            tooltipTitle={`${selectedCount}件を削除`}
            onClick={(e) => {
              e.stopPropagation();
              onBulkDelete?.();
            }}
          />
        )}
      </SpeedDial>
      <AddTodoButton
        onClick={onAddClick}
        disabled={isBulkDeleteMode}
        sx={{
          opacity: isBulkDeleteMode ? 0.6 : 1,
        }}
      />
    </Box>
  );
};