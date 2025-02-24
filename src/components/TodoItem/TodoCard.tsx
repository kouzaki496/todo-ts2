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
    onClick={onClick}
    sx={{
      mb: 2,
      display: 'flex',
      alignItems: 'center',
      cursor: isBulkDeleteMode ? 'default' : 'pointer',
      boxShadow: 4,
      borderRadius: 3,
      backgroundColor: isSelected ? 'action.selected' : (isCompleted ? 'grey.100' : 'background.paper'),
      borderColor: (theme) => {
        if (isCompleted) return theme.palette.divider;
        if (isOverdue) return theme.palette.error.main;
        if (isDueToday) return theme.palette.warning.main;
        return theme.palette.divider;
      },
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}
  >
    {children}
  </Card>
);