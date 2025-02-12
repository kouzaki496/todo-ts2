// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

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
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
  },
  typography: typography,
  spacing: spacing,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;