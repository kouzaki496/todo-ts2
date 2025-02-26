/**
 * Todoの表示用カードコンポーネント
 * - 見た目の制御のみを担当
 * - ロジックは持たない
 */
import React, { useCallback } from 'react';
import { CardContent, Typography, Box, IconButton, Theme } from '@mui/material';
import { Card } from '../../common/Card';
import { StatusCheckBox, DeleteCheckBox } from '../../common/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { TodoCardProps } from '../../../types/todo';

const TodoCard = ({
  todo,
  onSelect,
  onEdit,
  onDelete,
  onComplete,
  isBulkDeleteMode
}: TodoCardProps) => {
  // メモ化したイベントハンドラ
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect();
  }, [onSelect]);

  const handleComplete = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onComplete(e.target.checked);
  }, [onComplete]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  }, [onEdit]);

  // 日付関連の計算を最適化
  const today = React.useMemo(() => new Date().toISOString().split('T')[0], []);
  const { isOverdue, isDueToday } = React.useMemo(() => ({
    isOverdue: new Date(todo.dueDate) < new Date(today),
    isDueToday: todo.dueDate === today
  }), [todo.dueDate, today]);

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
          checked={todo.selected}
          onChange={handleCheckboxChange}
          sx={{
            p: 0.5,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }}
        />
      )}
      <Card
        selected={todo.selected}
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
          backgroundColor: todo.selected ? 'action.selected' : (todo.completed ? 'grey.100' : 'background.paper'),
          border: (theme: Theme) => {
            const color = todo.completed
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
            checked={todo.completed}
            onChange={handleComplete}
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
                color: todo.completed ? 'text.secondary' : 'text.primary',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </Typography>
            {todo.dueDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                {!todo.completed && (isOverdue || isDueToday) && (
                  <WhatshotIcon
                    color={isOverdue ? "error" : "warning"}
                    fontSize="small"
                  />
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(todo.dueDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
            )}
          </Box>
          {!isBulkDeleteMode && onEdit && (
            <IconButton
              onClick={handleEdit}
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

export default React.memo(TodoCard);