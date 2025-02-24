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
  transform: 'scale(1.2)',
}));

const TodoItem = ({ todo, updateTodo, deleteTodo, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleStatus = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTitle: string, updatedDueDate: string, updatedDetails: string, updatedCompleted: boolean) => {
    updateTodo(todo.id, { title: updatedTitle, dueDate: updatedDueDate, details: updatedDetails, completed: updatedCompleted });
    setIsEditing(false);
  };

  // 期限が過ぎているかどうかをチェック
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = new Date(todo.dueDate) < new Date(today);
  const isDueToday = todo.dueDate === today;

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: (theme) => todo.completed ? theme.palette.grey[100] : theme.palette.background.paper,
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
            onChange={toggleStatus}
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
        <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleEdit} color="secondary">
            <EditIcon />
          </IconButton>
        </CardActions>
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