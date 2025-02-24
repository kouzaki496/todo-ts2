import React from 'react';
import Todo from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import { Box, Checkbox } from '@mui/material';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  onEdit: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  onToggleSelect: (id: number) => void;
  isBulkDeleteMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, ...props }) => {
  return (
    <Box sx={{
      width: '100%',
      transition: 'padding 0.2s ease',  // スムーズな切り替え
    }}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          isBulkDeleteMode={props.isBulkDeleteMode}
          isSelected={todo.selected}
          onToggleSelect={() => props.onToggleSelect(todo.id)}
        >
          <TodoItem
            todo={todo}
            updateTodo={props.updateTodo}
            onEdit={props.onEdit}
            deleteTodo={props.deleteTodo}
            onToggleSelect={props.onToggleSelect}
            isBulkDeleteMode={props.isBulkDeleteMode}
          />
        </TodoListItem>
      ))}
    </Box>
  );
};

export default TodoList;