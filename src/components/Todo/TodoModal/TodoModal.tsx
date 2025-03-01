import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Todo from '@/types/todo';
import TextField from '@/components/common/TextField';

interface TodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (title: string, dueDate: string, details: string, completed: boolean) => void;
  onDelete?: (id: number | string) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, todo, onClose, onSave, onDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [details, setDetails] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (open) {
      if (todo && todo.id) {
        setTitle(todo.title || '');
        setDueDate(todo.dueDate || '');
        setDetails(todo.details || '');
        setCompleted(todo.completed || false);
        setIsEditable(false);
      } else {
        setTitle('');
        setDueDate(new Date().toISOString().split('T')[0]);
        setDetails('');
        setCompleted(false);
        setIsEditable(true);
      }
    }
  }, [open, todo]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('タイトルは必須です');
      return;
    }
    onSave(title, dueDate, details, completed);
  };

  const handleDelete = () => {
    if (todo && todo.id && onDelete) {
      if (window.confirm('このタスクを削除してもよろしいですか？')) {
        onDelete(todo.id);
        onClose();
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isEditable ? (todo && todo.id ? '編集' : '新規タスク') : 'タスクの詳細'}
          <Box>
            {todo && todo.id && (
              <>
                <IconButton onClick={toggleEditMode} color="primary">
                  <EditIcon />
                </IconButton>
                {onDelete && (
                  <IconButton onClick={handleDelete} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="タイトル"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!title.trim()}
          helperText={!title.trim() ? "タイトルは必須です" : ""}
          isEditable={isEditable}
        />
        <TextField
          margin="dense"
          label="期限"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
          isEditable={isEditable}
        />
        <TextField
          margin="dense"
          label="詳細"
          multiline
          rows={4}
          fullWidth
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          isEditable={isEditable}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={!isEditable}
            />
          }
          label="完了"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        {isEditable && (
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!title.trim()}
          >
            保存
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;