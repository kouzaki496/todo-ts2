import React from 'react';
import { Fab, FabProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoButtonProps extends FabProps {
  onClick: () => void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onClick, ...props }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        ...props.sx,
      }}
      {...props}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTodoButton;