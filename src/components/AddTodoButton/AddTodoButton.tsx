import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoButtonProps {
  onClick: () => void;
  sx?: object;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onClick, sx }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      sx={sx}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTodoButton;