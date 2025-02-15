import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from './TodoItem';
import { TodoItemProps } from '../../types/todo';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
  argTypes: {
    todo: {
      control: 'object',
    },
  },
} as Meta;

const Template: StoryFn<TodoItemProps> = (args) => {
  return <TodoItem {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: 1,
    title: 'Sample Task',
    completed: false,
    dueDate: '2023-12-31',
  },
  updateTodo: (id, updatedTask) => {
    console.log(`Updated Todo ${id}`, updatedTask);
  },
  deleteTodo: (id) => {
    console.log(`Deleted Todo ${id}`);
  },
};

export const Completed = Template.bind({});
Completed.args = {
  ...Default.args,
  todo: {
    ...Default.args.todo!,
    completed: true,
  },
};