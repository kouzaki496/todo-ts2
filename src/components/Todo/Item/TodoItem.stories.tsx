import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodoItem from './TodoItem';
import { useTodoItem } from '../../../hooks/useTodoItem';
import type { TodoItemProps } from './TodoItem';
import type Todo from '../../../types/todo';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as Meta<typeof TodoItem>;

interface StoryProps extends Omit<TodoItemProps, 'title' | 'completed' | 'selected' | 'dueDate' | 'isOverdue' | 'isDueToday'> {
  todo: Todo;
}

const Template: StoryFn<StoryProps> = ({ todo, ...args }) => {
  const {
    isOverdue,
    isDueToday,
    handleSelect,
    handleComplete,
    handleEdit
  } = useTodoItem({
    todo,
    updateTodo: async (todo) => console.log('Update Todo:', todo),
    onEdit: (todo) => console.log('Edit Todo:', todo),
    onToggleSelect: (id) => console.log('Toggle Select:', id),
  });

  return (
    <TodoItem
      {...args}
      title={todo.title}
      completed={todo.completed}
      selected={todo.selected}
      dueDate={todo.dueDate}
      isOverdue={isOverdue}
      isDueToday={isDueToday}
      onSelect={handleSelect}
      onComplete={handleComplete}
      onEdit={handleEdit}
    />
  );
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
  isBulkDeleteMode: false
};