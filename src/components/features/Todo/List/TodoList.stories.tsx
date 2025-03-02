import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TodoList} from '@/components/features/Todo/List/TodoList';
import type { TodoListProps } from '@/types/todo';
import { getTestDates } from '@/utils/date';
import { createSampleTodo } from '@/utils/storybook';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as Meta<typeof TodoList>;

const Template: StoryFn<typeof TodoList> = (args) => <TodoList {...args} />;

const { today, yesterday, dayBeforeYesterday } = getTestDates();

// イベントハンドラをオブジェクトにまとめる
const handlers: Pick<TodoListProps, 'updateTodo' | 'onEdit' | 'onToggleSelect'> = {
  updateTodo: async (todo) => console.log('Update Todo:', todo),
  onEdit: (todo) => console.log('Edit Todo:', todo),
  onToggleSelect: (id) => console.log('Toggle Select:', id),
};

export const Default = Template.bind({});
Default.args = {
  todos: [
    createSampleTodo(1, 'Sample Task 1', today),
    createSampleTodo(2, 'Sample Task 2', yesterday),
    createSampleTodo(3, 'Sample Task 3', dayBeforeYesterday),
  ],
  ...handlers,
  isBulkDeleteMode: false,
};

export const BulkDeleteMode = Template.bind({});
BulkDeleteMode.args = {
  ...Default.args,
  isBulkDeleteMode: true,
  todos: [
    createSampleTodo(1, 'Sample Task 1', today),
    createSampleTodo(2, 'Sample Task 2', yesterday),
    createSampleTodo(3, 'Sample Task 3', dayBeforeYesterday),
  ].map(todo => ({ ...todo, selected: true })),
};