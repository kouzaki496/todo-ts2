// src/components/common/Modal/Modal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@/components/common/Button/Button';
/**
 * Modalコンポーネントの型定義
 * - open: モーダルが開いているかどうか
 * - title: モーダルのタイトル
 * - onClose: モーダルを閉じるための関数
 * - onConfirm: モーダルを閉じるための関数
 * - onCancel: モーダルを閉じるための関数
 * - onDelete: モーダルを削除するための関数
 * - children: モーダーの内容
 * - maxWidth: モーダルの最大幅
 * - fullWidth: モーダルが全幅に表示されるかどうか
 * - deleteButton: 削除ボタンを表示するかどうか
 */
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