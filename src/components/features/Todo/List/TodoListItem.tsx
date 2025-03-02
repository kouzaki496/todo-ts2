import { Box } from '@mui/material';
import { DeleteCheckBox } from '@/components/index';
import { TodoListItemProps } from '@/types/todo';

export const TodoListItem = ({
  children,
  isBulkDeleteMode,
  isSelected,
  onToggleSelect,
}: TodoListItemProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      mb: { xs: 0, sm: 1 },
      mx: { xs: 0, sm: 1 },
      cursor: isBulkDeleteMode ? 'pointer' : 'default',
    }}
    onClick={() => isBulkDeleteMode && onToggleSelect()}
  >
    {isBulkDeleteMode && (
      <DeleteCheckBox
        checked={isSelected}
        onChange={() => {}}
        sx={{
          p: 0.5,
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
        }}
      />
    )}
    <Box sx={{
      flex: 1,
      opacity: isBulkDeleteMode ? 0.7 : 1,
      pointerEvents: isBulkDeleteMode ? 'none' : 'auto',
    }}>
      {children}
    </Box>
  </Box>
);

export default TodoListItem;
