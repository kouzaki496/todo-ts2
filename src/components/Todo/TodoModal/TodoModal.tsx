import React, { useState, useEffect } from 'react';
import { TextField, Box, FormControlLabel, Checkbox } from '@mui/material';
import Modal from '@/components/common/Modal';
import Todo from '@/types/todo';

interface TodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedDueDate: string, updatedDetails: string, updatedCompleted: boolean) => void;
  onDelete?: (id: string | number) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, todo, onClose, onSave, onDelete }) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDueDate, setEditedDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [editedDetails, setEditedDetails] = useState('');
  const [editedCompleted, setEditedCompleted] = useState(false);

  useEffect(() => {
    if (open) {
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
    }
  }, [todo, open]);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert('タスク名は必須です。');
      return;
    }
    onSave(editedTitle, editedDueDate, editedDetails, editedCompleted);
  };

  const handleDelete = () => {
    if (!todo) return;
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      onDelete?.(todo.id);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      title={todo ? 'タスクを編集' : '新しいタスクを追加'}
      onClose={onClose}
      onConfirm={handleSave}
      onCancel={onClose}
      onDelete={todo && onDelete ? handleDelete : undefined}
      deleteButton={!!todo}
      maxWidth="md"
      fullWidth
    >
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
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
              onChange={(e) => {
                e.stopPropagation();
                setEditedCompleted(e.target.checked);
              }}
            />
          }
          label="完了"
        />
      </Box>
    </Modal>
  );
};

export default TodoModal;