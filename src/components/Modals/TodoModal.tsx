import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import Todo from '../../types/todo';

interface TodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedDueDate: string, updatedDetails: string, updatedCompleted: boolean) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, todo, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(todo?.title || '');
  const [editedDueDate, setEditedDueDate] = useState(todo?.dueDate || new Date().toISOString().split('T')[0]);
  const [editedDetails, setEditedDetails] = useState(todo?.details || '');
  const [editedCompleted, setEditedCompleted] = useState(todo?.completed || false);

  useEffect(() => {
    if (todo) {
      setEditedTitle(todo.title);
      setEditedDueDate(todo.dueDate);
      setEditedDetails(todo.details || '');
      setEditedCompleted(todo.completed);
    } else {
      setEditedTitle('');
      setEditedDueDate(new Date().toISOString().split('T')[0]);
      setEditedDetails('');
      setEditedCompleted(false);
    }
  }, [todo]);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert('タスク名は必須です。');
      return;
    }
    onSave(editedTitle, editedDueDate, editedDetails, editedCompleted);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{todo ? 'タスクを編集' : '新しいタスクを追加'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="タスク名"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="期限"
            type="date"
            fullWidth
            variant="outlined"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />
          <TextField
            margin="dense"
            label="詳細"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editedCompleted}
                onChange={(e) => setEditedCompleted(e.target.checked)}
                color="primary"
              />
            }
            label="完了"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          キャンセル
        </Button>
        <Button onClick={handleSave} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;