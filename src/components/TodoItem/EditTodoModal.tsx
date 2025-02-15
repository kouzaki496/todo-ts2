import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import Todo from '../../types/todo';

interface EditTodoModalProps {
  open: boolean;
  todo: Todo;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedDueDate: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ open, todo, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    onSave(editedTitle, editedDueDate);
    onClose();
  };

  // 今日の日付を取得してフォーマット
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>タスクを編集</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="タスク名"
          type="text"
          fullWidth
          variant="outlined"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
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
            min: today,
          }}
        />
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

export default EditTodoModal;