import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from './TodoItem';
import { TodoItemProps } from '../../types/todo';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
  argTypes: {
    'todo.title': { control: 'text' }, // titleを個別に制御
    'todo.completed': { control: 'boolean' }, // completedを個別に制御
  },
} as Meta;

const Template: StoryFn<TodoItemProps> = (args) => {
  const { todo, ...rest } = args;
  return (
    <TodoItem
      {...rest}
      todo={{
        ...todo,
        title: args['todo.title'],
        completed: args['todo.completed'],
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: 1,
    title: 'Sample Task',
    completed: false,
    dueDate: '2023-12-31',
  },
  'todo.title': 'Sample Task', // デフォルト値を設定
  'todo.completed': false, // デフォルト値を設定
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
    id: Default.args.todo!.id,
    title: Default.args.todo!.title,
    dueDate: Default.args.todo!.dueDate,
    completed: true,
  },
  'todo.title': Default.args.todo!.title, // デフォルト値を設定
  'todo.completed': true, // デフォルト値を設定
};