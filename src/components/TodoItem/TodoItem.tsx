//src/components/TodoItem/TodoItem.tsx
import React, { useState } from 'react';
import { TodoItemProps } from '../../types/todo';
import { Checkbox, TextField, Button, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

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
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const toggleStatus = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, { title: editedTitle });
    setIsEditing(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: (theme) => (todo.completed ? theme.palette.gray.light : theme.palette.background.paper),
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StyledCheckbox
          color='primary'
          checked={todo.completed}
          onChange={toggleStatus}
        />
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ ml: 1 }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ cursor: 'pointer', ml: 1 }}
          >
            {todo.title}
          </Typography>
        )}
        {todo.dueDate && (
          <Typography variant="caption" color="textSecondary" sx={{ ml: 'auto', mr: 1 }}>
            期限: {todo.dueDate}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
          <Button onClick={handleSave} variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
            保存
          </Button>
        ) : (
          <IconButton onClick={handleEdit} color="secondary">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => deleteTodo(todo.id)} color="default">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TodoItem;