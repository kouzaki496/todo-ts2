// src/components/common/Modal/Modal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@/components/common/Button/Button';

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  deleteButton?: boolean;
}

const Modal = ({
  open,
  title,
  onClose,
  onConfirm,
  onCancel,
  onDelete,
  children,
  maxWidth = 'md',
  fullWidth = true,
  deleteButton
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ padding: 2, gap: 1 }}>
        {deleteButton && onDelete && (
          <Button
            onClick={onDelete}
            color="error"
            variant="contained"
            label="削除"
            sx={{ mr: 'auto' }}
          />
        )}
        {onCancel && (
          <Button
            onClick={onCancel}
            color="primary"
            variant="outlined"
            label="キャンセル"
            sx={{ minWidth: 100 }}
          />
        )}
        {onConfirm && (
          <Button
            onClick={onConfirm}
            color="primary"
            variant="contained"
            label="保存"
            sx={{ minWidth: 100 }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;