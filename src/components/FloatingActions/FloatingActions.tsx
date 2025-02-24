import React from 'react';
import AddTodoButton from '../AddTodoButton/AddTodoButton';

interface FloatingActionsProps {
  onAddClick?: () => void;
  disabled?: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onAddClick,
  disabled,
}) => {
  return (
    <AddTodoButton
      onClick={onAddClick}
      disabled={disabled}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        opacity: disabled ? 0.6 : 1,
      }}
    />
  );
};