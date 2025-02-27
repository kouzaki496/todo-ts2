//src/components/Todo/Item/TodoItem.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from './TodoItem';
import type { TodoItemProps } from '../../../types/todo';
import { compareDates } from '../../../utils/date';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as Meta<typeof TodoItem>;

const Template: StoryFn<TodoItemProps> = (args) => <TodoItem {...args} />;

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - MILLISECONDS_IN_A_DAY).toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + MILLISECONDS_IN_A_DAY).toISOString().split('T')[0];
const { isOverdue, isDueToday } = compareDates(tomorrow);

export const Default = Template.bind({});
Default.args = {
  title: 'Sample Task',
  completed: false,
  selected: false,
  dueDate: tomorrow,
  isOverdue,
  isDueToday,
  isBulkDeleteMode: false,
  onSelect: () => console.log('Selected'),
  onComplete: (checked) => console.log('Completed:', checked),
  onEdit: () => console.log('Edit clicked'),
};

export const DueToday = Template.bind({});
DueToday.args = {
  ...Default.args,
  title: 'Due Today Task',
  dueDate: today,
  isOverdue: false,
  isDueToday: true,
};

export const Overdue = Template.bind({});
Overdue.args = {
  ...Default.args,
  title: 'Overdue Task',
  dueDate: yesterday,
  isOverdue: true,
  isDueToday: false,
};

export const Completed = Template.bind({});
Completed.args = {
  ...Default.args,
  title: 'Completed Task',
  completed: true,
};

export const BulkDeleteMode = Template.bind({});
BulkDeleteMode.args = {
  ...Default.args,
  isBulkDeleteMode: true,
  selected: true,
};