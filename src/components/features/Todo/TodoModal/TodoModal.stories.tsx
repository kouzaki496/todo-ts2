import type { Meta, StoryObj } from '@storybook/react';
import TodoModal from '@/components/features/TodoModal';
import type Todo from '@/types/todo';

const meta = {
  title: 'Components/Modals/TodoModal',
  component: TodoModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TodoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// サンプルのTodoデータ
const sampleTodo: Todo = {
  id: 1,
  title: 'Sample Task',
  completed: false,
  dueDate: new Date().toISOString().split('T')[0],
  details: 'This is a sample task',
  selected: false,
};

export const NewTodo: Story = {
  args: {
    open: true,
    todo: null,
    onClose: () => console.log('Modal closed'),
    onSave: (title, dueDate, details, completed) =>
      console.log('Saved:', { title, dueDate, details, completed }),
  },
};

export const EditTodo: Story = {
  args: {
    open: true,
    todo: sampleTodo,
    onClose: () => console.log('Modal closed'),
    onSave: (title, dueDate, details, completed) =>
      console.log('Saved:', { title, dueDate, details, completed }),
    onDelete: (id) => console.log('Deleted:', id),
  },
};

export const ClosedModal: Story = {
  args: {
    open: false,
    todo: null,
    onClose: () => console.log('Modal closed'),
    onSave: (title, dueDate, details, completed) =>
      console.log('Saved:', { title, dueDate, details, completed }),
    onDelete: (id) => console.log('Deleted:', id),
  },
};

export const Default: Story = {
  args: {
    open: true,
    todo: sampleTodo,
    onClose: () => console.log('Modal closed'),
    onSave: (title, dueDate, details, completed) =>
      console.log('Saved:', { title, dueDate, details, completed }),
  },
};
