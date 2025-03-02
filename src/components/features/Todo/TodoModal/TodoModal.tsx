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
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import Todo from '@/types/todo';
import { Input, TextField } from '@/components/index';
import { isRequired } from '@/utils/validation';

interface TodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (title: string, dueDate: string, details: string, completed: boolean) => void;
  onDelete?: (id: number | string) => void;
}

const TodoModal = ({ open, todo, onClose, onSave, onDelete }: TodoModalProps) => {
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
    if (!isRequired(title)) {
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
              <Button onClick={toggleEditMode} color="primary" variant="contained" startIcon={isEditable ? <VisibilityIcon /> : <EditIcon />}>
                {isEditable ? '閲覧モード' : '編集モード'}
              </Button>
            )}
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Input
          autoFocus={isEditable}
          margin="dense"
          label="タイトル"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!isRequired(title)}
          helperText={!isRequired(title) ? "タイトルは必須です" : ""}
          isEditable={isEditable}
          disablePointerEvents={!isEditable}
        />
        <Input
          margin="dense"
          label="期限"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
          isEditable={isEditable}
          disablePointerEvents={!isEditable}
        />
        <TextField
          margin="dense"
          label="詳細"
          fullWidth
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          isEditable={isEditable}
          disablePointerEvents={!isEditable}
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
        {onDelete && (
          <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
            削除
          </Button>
        )}
        <Box flexGrow={1} />
        <Button onClick={handleClose}>キャンセル</Button>
        {isEditable && (
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!isRequired(title)}
          >
            保存
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;