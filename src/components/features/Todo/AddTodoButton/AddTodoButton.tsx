import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoButtonProps {
  onClick: () => void;
  disabled?: boolean;
  sx?: object;
}

const AddTodoButton = ({ onClick, disabled, sx }: AddTodoButtonProps) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      sx={{
        ...sx,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTodoButton;