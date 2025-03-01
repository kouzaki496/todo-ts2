import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'Default Avatar',
    size: 40,
  },
};

export const Large: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'Large Avatar',
    size: 80,
  },
};

export const Small: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'Small Avatar',
    size: 20,
  },
};