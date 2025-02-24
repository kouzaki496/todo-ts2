//src/components/TodoItem/TodoItem.tsx
import React, { useState } from 'react';
import { TodoItemProps } from '../../types/todo';
import { Checkbox, Typography, Card, CardContent, Box, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { styled } from '@mui/material/styles';
import TodoModal from '../Modals/TodoModal';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.dark,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
}));

const TodoItem = ({ todo, updateTodo, deleteTodo, onEdit, onToggleSelect, isBulkDeleteMode }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleStatus = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const handleSave = async (updatedTitle: string, updatedDueDate: string, updatedDetails: string, updatedCompleted: boolean) => {
    try {
      await updateTodo({
        ...todo,
        title: updatedTitle,
        dueDate: updatedDueDate,
        details: updatedDetails,
        completed: updatedCompleted
      });
      setIsEditing(false);  // 保存完了後にモーダルを閉じる
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  // 期限が過ぎているかどうかをチェック
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = new Date(todo.dueDate) < new Date(today);
  const isDueToday = todo.dueDate === today;

  return (
    <>
      <Card
        variant="outlined"
        onClick={(e) => {
          if (!isBulkDeleteMode) {
            setIsEditing(true);
          }
        }}
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: isBulkDeleteMode ? 'default' : 'pointer',
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: todo.selected ? 'action.selected' : (todo.completed ? 'grey.100' : 'background.paper'),
          borderColor: (theme) => {
            if (todo.completed) return theme.palette.divider;
            if (isOverdue) return theme.palette.error.main;
            if (isDueToday) return theme.palette.warning.main;
            return theme.palette.divider;
          },
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <StyledCheckbox
            color='primary'
            checked={todo.completed}
            onChange={(e) => {
              e.stopPropagation();
              toggleStatus();
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <Typography
              variant="body1"
              sx={{
                cursor: 'pointer',
                color: todo.completed ? 'gray' : 'text.primary',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </Typography>
          </Box>
          {todo.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: 1 }}>
              {!todo.completed && isOverdue && <WhatshotIcon color="error" sx={{ mr: 0.5 }} />}
              {!todo.completed && isDueToday && <WhatshotIcon color="warning" sx={{ mr: 0.5 }} />}
              <Typography variant="caption" color="textSecondary">
                {new Date(todo.dueDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              </Typography>
            </Box>
          )}
        </CardContent>
        {!isBulkDeleteMode && (
          <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
      <TodoModal
        open={isEditing}
        todo={todo}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        onDelete={deleteTodo}
      />
    </>
  );
};

export default TodoItem;