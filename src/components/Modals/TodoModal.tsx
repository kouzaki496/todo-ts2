import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControlLabel, Checkbox } from '@mui/material';
import Button from '../Button/Button';  // カスタムButtonをインポート
import DeleteIcon from '@mui/icons-material/Delete';
import Todo from '../../types/todo';

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
    if (open) {  // openの時のみ更新
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
                onChange={(e) => {
                  e.stopPropagation();  // イベントの伝播を停止
                  setEditedCompleted(e.target.checked);
                }}
              />
            }
            label="完了"
            onChange={(e) => {  // onClickの代わりにonChangeを使用
              setEditedCompleted(!editedCompleted);
            }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              margin: 0,
              width: 'fit-content',
              '& .MuiButtonBase-root': {
                padding: 1,
              },
              '& .MuiFormControlLabel-label': {
                padding: '4px 8px',
                cursor: 'pointer',
              },
              '& > span': {
                margin: 0,
                padding: 0,
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2, gap: 1 }}>
        {todo && onDelete && (
          <Button
            onClick={() => {
              onDelete(todo.id);
              onClose();
            }}
            color="error"
            variant="contained"
            icon={<DeleteIcon />}
            label="削除"
            sx={{
              mr: 'auto',
            }}
          />
        )}
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          label="キャンセル"
          sx={{
            minWidth: 100,
          }}
        />
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          label="保存"
          sx={{
            minWidth: 100,
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;