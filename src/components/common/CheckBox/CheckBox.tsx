import { styled } from '@mui/material/styles';
import { Checkbox } from '@mui/material';

export const StatusCheckBox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.dark,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
}));

export const DeleteCheckBox = styled(Checkbox)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
  color: theme.palette.error.main,
  '&.Mui-checked': {
    color: theme.palette.error.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    opacity: 0.1,
  },
}));

export default StatusCheckBox;
