import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoList from './TodoList';
import type Todo from '../../types/todo';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as Meta<typeof TodoList>;

const Template: StoryFn<typeof TodoList> = (args) => <TodoList {...args} />;

const commonHandlers = {
  updateTodo: async (todo: Todo) => console.log('Update Todo:', todo),
  deleteTodo: async (id: string | number) => console.log('Delete Todo:', id),
};

export const Default = Template.bind({});
Default.args = {
  todos: [
    {
      id: 1,
      title: 'Sample Task 1',
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明日の日付
      selected: false,
    },
    {
      id: 2,
      title: 'Sample Task 2',
      completed: true,
      dueDate: new Date().toISOString().split('T')[0], // 今日の日付
      selected: false,
    },
    {
      id: 3,
      title: 'Sample Task 3',
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
      selected: false,
    },
  ],
  ...commonHandlers
};