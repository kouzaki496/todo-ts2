import React from 'react';
import { Box, Button, ButtonGroup, useTheme, useMediaQuery, Fade, Paper } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';

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

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        bgcolor: 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: 2,
      }}>
        <Button
          variant={isBulkDeleteMode ? "contained" : "outlined"}
          color={isBulkDeleteMode ? "error" : "primary"}
          onClick={onToggleBulkDeleteMode}
          startIcon={<DeleteSweepIcon />}
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: isBulkDeleteMode
                ? 'error.dark'
                : 'action.hover',
            },
          }}
        >
          {isBulkDeleteMode ? '一括削除モードを終了' : '一括削除モードを開始'}
        </Button>

        <Fade in={isBulkDeleteMode}>
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            width: isMobile ? '100%' : 'auto',
          }}>
            <ButtonGroup
              variant="outlined"
              color="primary"
              orientation={isMobile ? 'vertical' : 'horizontal'}
              fullWidth={isMobile}
              sx={{
                '& .MuiButton-root': {
                  borderRadius: '8px !important',
                  m: '1px',
                  transition: 'all 0.2s ease',
                  '&:hover:not(:disabled)': {
                    bgcolor: 'action.hover',
                  },
                },
              }}
            >
              <Button
                onClick={onSelectAll}
                startIcon={<SelectAllIcon />}
              >
                全て選択
              </Button>
              <Button
                onClick={onSelectCompleted}
                startIcon={<CheckCircleIcon />}
              >
                完了済みを選択
              </Button>
              <Button
                onClick={onClearSelection}
                startIcon={<ClearIcon />}
                disabled={selectedCount === 0}
              >
                選択解除
              </Button>
            </ButtonGroup>

            <Button
              variant="contained"
              color="error"
              onClick={onBulkDelete}
              disabled={selectedCount === 0}
              fullWidth={isMobile}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover:not(:disabled)': {
                  bgcolor: 'error.dark',
                },
              }}
            >
              選択したタスクを削除 ({selectedCount})
            </Button>
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
};