import React from 'react';
import Todo from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import { Box, Checkbox } from '@mui/material';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  onEdit: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  onToggleSelect: (id: number) => void;
  isBulkDeleteMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo, onEdit, deleteTodo, onToggleSelect, isBulkDeleteMode }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {todos.map((todo) => (
        <Box
          key={todo.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          {isBulkDeleteMode && (
            <Checkbox
              checked={todo.selected}
              onChange={() => onToggleSelect(todo.id)}
              color="primary"
              sx={{
                ml: 1,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
                color: 'error.main',
                '&.Mui-checked': {
                  color: 'error.main',
                },
                '&:hover': {
                  backgroundColor: 'error.light',
                  opacity: 0.1,
                },
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <TodoItem
              todo={todo}
              updateTodo={updateTodo}
              onEdit={onEdit}
              deleteTodo={deleteTodo}
              onToggleSelect={onToggleSelect}
              isBulkDeleteMode={isBulkDeleteMode}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;