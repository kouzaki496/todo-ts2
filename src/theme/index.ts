// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[200],
      dark: colors.primary[700],
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[200],
      dark: colors.secondary[700],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;