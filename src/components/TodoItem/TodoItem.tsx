//src/components/TodoItem/TodoItem.tsx
import React, { useState } from 'react';
import { TodoItemProps } from '../../types/todo';
import { Checkbox, Typography, Card, CardContent, CardActions, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { styled } from '@mui/material/styles';
import EditTodoModal from './EditTodoModal';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.dark,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleStatus = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTitle: string, updatedDueDate: string) => {
    updateTodo(todo.id, { title: updatedTitle, dueDate: updatedDueDate });
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
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: (theme) => todo.completed ? theme.palette.grey[200] : theme.palette.background.paper,
          borderColor: (theme) => {
            if (todo.completed) return theme.palette.divider;
            if (isOverdue) return theme.palette.error.main;
            if (isDueToday) return theme.palette.warning.main;
            return theme.palette.divider;
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
          <IconButton onClick={() => deleteTodo(todo.id)} color="default">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <EditTodoModal
        open={isEditing}
        todo={todo}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default TodoItem;