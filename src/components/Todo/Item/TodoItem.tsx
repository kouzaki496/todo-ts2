/**
 * Todoの表示用カードコンポーネント
 * - 見た目の制御のみを担当
 * - ロジックは持たない
 */
import React from 'react';
import { CardContent, Typography, Box, IconButton, Theme } from '@mui/material';
import { Card } from '../../common/Card';
import { StatusCheckBox, DeleteCheckBox } from '../../common/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export interface TodoItemProps {
  title: string;
  completed: boolean;
  selected: boolean;
  dueDate: string;
  isOverdue: boolean;
  isDueToday: boolean;
  isBulkDeleteMode: boolean;
  onSelect: () => void;
  onComplete: (checked: boolean) => void;
  onEdit?: () => void;
}

const TodoItem = ({
  title,
  completed,
  selected,
  dueDate,
  isOverdue,
  isDueToday,
  isBulkDeleteMode,
  onSelect,
  onComplete,
  onEdit
}: TodoItemProps) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: { xs: 0, sm: 1 },
      mx: { xs: 0, sm: 1 },
    }}>
      {isBulkDeleteMode && (
        <DeleteCheckBox
          checked={selected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          sx={{
            p: 0.5,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }}
        />
      )}
      <Card
        selected={selected}
        disabled={isBulkDeleteMode}
        onClick={onSelect}
        sx={{
          flex: 1,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: isBulkDeleteMode ? 'default' : 'pointer',
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: selected ? 'action.selected' : (completed ? 'grey.100' : 'background.paper'),
          border: (theme: Theme) => {
            const color = completed
              ? theme.palette.divider
              : isOverdue
                ? theme.palette.error.main
                : isDueToday
                  ? theme.palette.warning.main
                  : theme.palette.divider;
            return `1px solid ${color}`;
          },
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <StatusCheckBox
            checked={completed}
            onChange={(e) => {
              e.stopPropagation();
              onComplete(e.target.checked);
            }}
          />
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Typography
              variant="body1"
              sx={{
                color: completed ? 'text.secondary' : 'text.primary',
                textDecoration: completed ? 'line-through' : 'none',
              }}
            >
              {title}
            </Typography>
            {dueDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                {!completed && (isOverdue || isDueToday) && (
                  <WhatshotIcon
                    color={isOverdue ? "error" : "warning"}
                    fontSize="small"
                  />
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(dueDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
            )}
          </Box>
          {!isBulkDeleteMode && onEdit && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              size="small"
              color="secondary"
            >
              <EditIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(TodoItem);