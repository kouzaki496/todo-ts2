import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoList from './TodoList';
import { Todo } from '../../types/todo';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  todos: [
    {
      id: 1,
      title: 'Sample Task 1',
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明日の日付
    },
    {
      id: 2,
      title: 'Sample Task 2',
      completed: true,
      dueDate: new Date().toISOString().split('T')[0], // 今日の日付
    },
    {
      id: 3,
      title: 'Sample Task 3',
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
    },
  ],
  updateTodo: (id, updatedFields) => console.log('Update Todo:', id, updatedFields),
  deleteTodo: (id) => console.log('Delete Todo:', id),
};