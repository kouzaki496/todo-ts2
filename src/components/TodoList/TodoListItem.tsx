import { Box } from '@mui/material';
import { StyledDeleteCheckbox } from '../common/StyledCheckbox';

interface TodoListItemProps {
  children: React.ReactNode;
  isBulkDeleteMode: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  children,
  isBulkDeleteMode,
  isSelected,
  onToggleSelect,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      mb: 2,
    }}
  >
    {isBulkDeleteMode && (
      <StyledDeleteCheckbox
        checked={isSelected}
        onChange={onToggleSelect}
        sx={{ ml: 1 }}
      />
    )}
    <Box sx={{ flex: 1 }}>
      {children}
    </Box>
  </Box>
);