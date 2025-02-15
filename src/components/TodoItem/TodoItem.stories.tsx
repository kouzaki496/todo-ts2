import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoItem from './TodoItem';
import { TodoItemProps } from '../../types/todo';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => <TodoItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: 1,
    title: 'Sample Task',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明日の日付
  },
  updateTodo: (id, updatedFields) => console.log('Update Todo:', id, updatedFields),
  deleteTodo: (id) => console.log('Delete Todo:', id),
};

export const DueToday = Template.bind({});
DueToday.args = {
  todo: {
    id: 2,
    title: 'Due Today Task',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0], // 今日の日付
  },
  updateTodo: (id, updatedFields) => console.log('Update Todo:', id, updatedFields),
  deleteTodo: (id) => console.log('Delete Todo:', id),
};

export const Overdue = Template.bind({});
Overdue.args = {
  todo: {
    id: 3,
    title: 'Overdue Task',
    completed: false,
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
  },
  updateTodo: (id, updatedFields) => console.log('Update Todo:', id, updatedFields),
  deleteTodo: (id) => console.log('Delete Todo:', id),
};

export const Completed = Template.bind({});
Completed.args = {
  todo: {
    id: 4,
    title: 'Completed Task',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // 今日の日付
  },
  updateTodo: (id, updatedFields) => console.log('Update Todo:', id, updatedFields),
  deleteTodo: (id) => console.log('Delete Todo:', id),
};