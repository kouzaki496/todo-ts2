// src/components/Button/Button.stories.tsx
import React from 'react';
import { StoryFn, Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: ['default', 'primary', 'secondary'] },
    variant: { control: 'select', options: ['text', 'outlined', 'contained'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    color: 'primary',
    variant: 'contained',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    color: 'secondary',
    variant: 'contained',
  },
};

