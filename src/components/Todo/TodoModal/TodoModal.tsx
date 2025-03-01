import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Todo from '@/types/todo';

interface TodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (title: string, dueDate: string, details: string, completed: boolean) => void;
  onDelete?: (id: number | string) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, todo, onClose, onSave, onDelete }) => {
  // 編集モードの状態
  const [isEditMode, setIsEditMode] = useState(false);

  // フォームの状態
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [details, setDetails] = useState('');
  const [completed, setCompleted] = useState(false);

  // モーダルが開かれたときに状態を初期化
  useEffect(() => {
    if (open) {
      if (todo && todo.id) {
        // 既存のTodoを編集する場合
        setTitle(todo.title || '');
        setDueDate(todo.dueDate || '');
        setDetails(todo.details || '');
        setCompleted(todo.completed || false);
        setIsEditMode(false); // 閲覧モードで開始
      } else {
        // 新規作成の場合
        setTitle('');
        setDueDate(new Date().toISOString().split('T')[0]);
        setDetails('');
        setCompleted(false);
        setIsEditMode(true); // 編集モードで開始
      }
    }
  }, [open, todo]);

  // モーダルが閉じられるときに編集モードをリセット
  const handleClose = () => {
    onClose();
  };

  // 保存処理
  const handleSave = () => {
    if (!title.trim()) {
      alert('タイトルは必須です');
      return;
    }
    onSave(title, dueDate, details, completed);
  };

  // 削除処理
  const handleDelete = () => {
    if (todo && todo.id && onDelete) {
      if (window.confirm('このタスクを削除してもよろしいですか？')) {
        onDelete(todo.id);
        onClose();
      }
    }
  };

  // 編集モードの切り替え
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isEditMode
            ? (todo && todo.id ? '編集' : '新規タスク')
            : 'タスクの詳細'}
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
        {isEditMode ? (
          // 編集モード
          <>
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
            />
            <TextField
              margin="dense"
              label="期限"
              type="date"
              fullWidth
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
              slotProps={{ input: { placeholder: ' ' } }}
            />
            <TextField
              margin="dense"
              label="詳細"
              multiline
              rows={4}
              fullWidth
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
              }
              label="完了"
            />
          </>
        ) : (
          // 閲覧モード
          <Box>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              期限: {dueDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              状態: {completed ? '完了' : '未完了'}
            </Typography>
            <Typography variant="body1" paragraph>
              {details || '詳細はありません'}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        {isEditMode && (
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