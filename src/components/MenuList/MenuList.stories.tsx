import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MenuList from './MenuList';

const meta: Meta<typeof MenuList> = {
  title: 'Components/MenuList',
  component: MenuList,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      defaultValue: 'bottom-right',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof MenuList> = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => <MenuList position={args.position} />,
};