/**
 * 個々のTodoアイテムを表示するコンポーネント
 * - アイテムの表示制御
 * - アイテムの操作（選択、編集、削除）
 */
import React from 'react';
import { TodoItemProps } from '../../../types/todo';
import TodoCard from '../Card/TodoCard';

const TodoItem = ({
  todo,
  updateTodo,
  onEdit,
  deleteTodo,
  onToggleSelect,
  isBulkDeleteMode
}: TodoItemProps) => {
  return (
    <TodoCard
      todo={todo}
      onSelect={() => onToggleSelect(todo.id)}
      onEdit={() => onEdit?.(todo)}
      onDelete={() => deleteTodo?.(todo.id)}
      onComplete={(completed) => updateTodo({ ...todo, completed })}
      isBulkDeleteMode={isBulkDeleteMode}
    />
  );
};

export { TodoItem };