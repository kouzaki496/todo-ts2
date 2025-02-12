// src/components/Button/Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: ['default', 'primary', 'secondary'] },
    variant: { control: 'select', options: ['text', 'outlined', 'contained'] },
    icon: {
      control: { type: 'boolean' },
      mapping: { true: <AddIcon />, false: null },
    },
  },
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    label: 'Primary Button',
    color: 'primary',
    variant: 'contained',
    icon: <AddIcon />,
  },
};

export const Secondary: StoryObj<typeof meta> = {
  args: {
    label: 'Secondary Button',
    color: 'secondary',
    variant: 'contained',
  },
};

