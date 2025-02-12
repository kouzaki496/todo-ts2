import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

// Storybookのグローバルパラメータを設定
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#000000' },
    ],
  },
  layout: 'centered',
  viewport: {
    viewports: {
      small: {
        name: 'Small mobile',
        styles: {
          width: '360px',
          height: '640px',
        },
      },
      large: {
        name: 'Large desktop',
        styles: {
          width: '1280px',
          height: '1024px',
        },
      },
    },
  },
};