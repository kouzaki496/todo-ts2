import React from 'react';
import { CardContent, Typography, Box, IconButton, Theme } from '@mui/material';
import { Card, StatusCheckBox, DeleteCheckBox } from '@/components/index';
// import { StatusCheckBox, DeleteCheckBox } from '@/components/common/CheckBox';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { TodoItemProps } from '@/types/todo';
/**
 * Todoアイテムの表示コンポーネント
 * - 個々のTodoの表示を担当
 * - 完了状態の表示
 * - 期限切れ/当日の警告表示
 * - 選択状態の表示
 * - 一括削除モードでのチェックボックス表示
 */

export const TodoItem = ({
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
  const handleCardClick = () => {
    if (isBulkDeleteMode) {
      onSelect?.();
    }
  };

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target instanceof HTMLElement && !e.target.closest('.status-checkbox')) {
            if (isBulkDeleteMode) {
              onSelect?.();
            } else if (onEdit) {
              onEdit();
            }
          }
        }}
        sx={{
          flex: 1,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
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
            className="status-checkbox"
            checked={completed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(TodoItem);