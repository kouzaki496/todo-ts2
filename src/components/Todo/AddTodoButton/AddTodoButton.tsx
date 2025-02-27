import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoButtonProps {
  onClick: () => void;
  disabled?: boolean;
  sx?: object;
}

const AddTodoButton = ({ onClick, disabled, sx }: AddTodoButtonProps) => {
  const [isClicking, setIsClicking] = React.useState(false);

  const handleClick = () => {
    if (isClicking || disabled) return;

    setIsClicking(true);
    onClick();

    // 1秒間はクリックを無効化
    setTimeout(() => {
      setIsClicking(false);
    }, 1000);
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={handleClick}
      disabled={disabled || isClicking}
      sx={{
        ...sx,
        opacity: (disabled || isClicking) ? 0.6 : 1,
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTodoButton;