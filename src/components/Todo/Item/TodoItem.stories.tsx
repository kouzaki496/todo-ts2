//src/components/Todo/Item/TodoItem.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from '@/components/Todo/Item/TodoItem';
import type { TodoItemProps } from '@/types/todo';
import { getTestDates } from '@/utils/date';
import { compareDates } from '@/utils/date';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as Meta<typeof TodoItem>;

const Template: StoryFn<TodoItemProps> = (args) => <TodoItem {...args} />;

const { today, yesterday, tomorrow } = getTestDates();
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