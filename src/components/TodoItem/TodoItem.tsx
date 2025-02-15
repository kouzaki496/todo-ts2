//src/components/TodoItem/TodoItem.tsx
import React, { useState, useEffect } from 'react';
import { TodoItemProps } from '../../types/todo';
import { TextField, Button, Typography, Card, CardContent, CardActions, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

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
    <Card variant="outlined" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', padding: '10px' }}>
      <Checkbox
        checked={todo.completed}
        onChange={toggleStatus}
      />
      <CardContent style={{ flexGrow: 1 }}>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        ) : (
          <Typography
            variant="body1"
            onClick={handleEdit}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {todo.title}
          </Typography>
        )}
        {todo.dueDate && (
          <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px' }}>
            期限: {todo.dueDate}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {isEditing && (
          <Button onClick={handleSave} variant="contained" color="primary" size="small">
            保存
          </Button>
        )}
        <Button onClick={() => deleteTodo(todo.id)} variant="outlined" color="secondary" size="small">
          削除
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItem;