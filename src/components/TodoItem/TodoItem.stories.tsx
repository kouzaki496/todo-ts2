import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from './TodoItem';
import type Todo from '../../types/todo';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as Meta<typeof TodoItem>;

const Template: StoryFn<typeof TodoItem> = (args) => <TodoItem {...args} />;

const commonHandlers = {
  updateTodo: async (todo: Todo) => console.log('Update Todo:', todo),
  deleteTodo: async (id: string | number) => console.log('Delete Todo:', id),
};

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: 1,
    title: 'Sample Task',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    selected: false,
  },
  ...commonHandlers
};

export const DueToday = Template.bind({});
DueToday.args = {
  todo: {
    id: 2,
    title: 'Due Today Task',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    selected: false,
  },
  ...commonHandlers
};

export const Overdue = Template.bind({});
Overdue.args = {
  todo: {
    id: 3,
    title: 'Overdue Task',
    completed: false,
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
    selected: false,
  },
  ...commonHandlers
};

export const Completed = Template.bind({});
Completed.args = {
  todo: {
    id: 4,
    title: 'Completed Task',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // 今日の日付
    selected: false,
  },
  ...commonHandlers
};