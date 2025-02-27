import React from 'react';
import Button from '@/components/common/Button/Button';
import AddIcon from '@mui/icons-material/Add';

const AddTodoButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      label="タスクを追加"
      icon={<AddIcon />}
      color="primary"
      variant="contained"
    />
  );
};

export default AddTodoButton;