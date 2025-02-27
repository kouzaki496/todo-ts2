import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TodoList } from './TodoList';
import type { TodoListProps } from '../../../types/todo';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as Meta<typeof TodoList>;

const Template: StoryFn<typeof TodoList> = (args) => <TodoList {...args} />;

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const dayBeforeYesterday = new Date(today);
dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

export const Default = Template.bind({});
Default.args = {
  todos: [
    {
      id: 1,
      title: 'Sample Task 1',
      completed: false,
      dueDate: today.toISOString().split('T')[0],
      selected: false,
    },
    {
      id: 2,
      title: 'Sample Task 2',
      completed: false,
      dueDate: yesterday.toISOString().split('T')[0],
      selected: false,
    },
    {
      id: 3,
      title: 'Sample Task 3',
      completed: false,
      dueDate: dayBeforeYesterday.toISOString().split('T')[0],
      selected: false,
    },
  ],
  updateTodo: async (todo) => console.log('Update Todo:', todo),
  onEdit: (todo) => console.log('Edit Todo:', todo),
  onToggleSelect: (id) => console.log('Toggle Select:', id),
  isBulkDeleteMode: false,
};

export const BulkDeleteMode = Template.bind({});
BulkDeleteMode.args = {
  ...Default.args,
  isBulkDeleteMode: true,
  todos: Default.args?.todos?.map(todo => ({ ...todo, selected: true })) || [],
};