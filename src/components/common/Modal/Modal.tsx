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
 * - children: モーダーの内容
 */
export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, title, onClose, onConfirm, onCancel, children }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {onCancel && <Button onClick={onCancel} color="secondary">キャンセル</Button>}
        {onConfirm && <Button onClick={onConfirm} color="primary">確認</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;