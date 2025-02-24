import React from 'react';
import Todo from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  onEdit: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo, onEdit, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          onEdit={onEdit}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;