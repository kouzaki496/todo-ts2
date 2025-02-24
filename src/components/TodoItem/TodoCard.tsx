import { Card, CardContent, CardActions } from '@mui/material';

interface TodoCardProps {
  children: React.ReactNode;
  isSelected: boolean;
  isCompleted: boolean;
  isOverdue: boolean;
  isDueToday: boolean;
  onClick: () => void;
  isBulkDeleteMode: boolean;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  children,
  isSelected,
  isCompleted,
  isOverdue,
  isDueToday,
  onClick,
  isBulkDeleteMode,
}) => (
  <Card
    variant="outlined"
    onClick={isBulkDeleteMode ? undefined : onClick}
    sx={{
      mb: 2,
      display: 'flex',
      alignItems: 'center',
      cursor: isBulkDeleteMode ? 'default' : 'pointer',
      boxShadow: 4,
      borderRadius: 3,
      backgroundColor: isSelected ? 'action.selected' : (isCompleted ? 'grey.100' : 'background.paper'),
      outline: isSelected ? '2px solid' : 'none',
      outlineColor: 'primary.main',
      borderColor: (theme) => {
        if (isCompleted) return theme.palette.divider;
        if (isOverdue) return theme.palette.error.main;
        if (isDueToday) return theme.palette.warning.main;
        return theme.palette.divider;
      },
      transition: 'all 0.2s',
      '&:hover': {
        transform: isBulkDeleteMode ? 'none' : 'scale(1.02)',
      },
    }}
  >
    {children}
  </Card>
);