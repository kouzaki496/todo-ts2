import React from 'react';
import Todo from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import { Box } from '@mui/material';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => Promise<void>;
  onEdit?: (todo: Todo) => void;
  deleteTodo?: (id: string | number) => Promise<void>;
  onToggleSelect: (id: string | number) => void;
  isBulkDeleteMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo, onEdit, deleteTodo, onToggleSelect, isBulkDeleteMode }) => {
  const handleUpdateTodo = async (todo: Todo) => {
    await updateTodo(todo);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          isBulkDeleteMode={isBulkDeleteMode}
          isSelected={todo.selected}
          onToggleSelect={() => onToggleSelect(todo.id)}
        >
          <TodoItem
            todo={todo}
            updateTodo={handleUpdateTodo}
            deleteTodo={deleteTodo}
            onEdit={onEdit}
            onToggleSelect={onToggleSelect}
            isBulkDeleteMode={isBulkDeleteMode}
          />
        </TodoListItem>
      ))}
    </Box>
  );
};

export default TodoList;