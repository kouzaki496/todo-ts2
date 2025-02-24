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
      mb: { xs: 0, sm: 1 },
      mx: { xs: 0, sm: 1 },
      cursor: isBulkDeleteMode ? 'pointer' : 'default',
    }}
    onClick={() => isBulkDeleteMode && onToggleSelect()}
  >
    {isBulkDeleteMode && (
      <StyledDeleteCheckbox
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