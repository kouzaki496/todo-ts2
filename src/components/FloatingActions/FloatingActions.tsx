import React from 'react';
import AddTodoButton from '../AddTodoButton/AddTodoButton';

interface FloatingActionsProps {
  onAddClick: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onAddClick,
}) => {
  return (
    <AddTodoButton
      onClick={onAddClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    />
  );
};