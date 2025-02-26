//src/components/Todo/List/TodoList.tsx
import { Stack } from "@mui/material";
import { TodoItem } from "../Item";
import { TodoListProps } from "@/types/todo";

/**
 * Todoリストを表示するコンポーネント
 * - リストの表示制御
 * - リストのレイアウト
 */
export const TodoList = ({
  todos,
  updateTodo,
  onEdit,
  deleteTodo,
  onToggleSelect,
  isBulkDeleteMode
}: TodoListProps) => {
  return (
    <Stack spacing={2}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          onEdit={onEdit}
          deleteTodo={deleteTodo}
          onToggleSelect={onToggleSelect}
          isBulkDeleteMode={isBulkDeleteMode}
        />
      ))}
    </Stack>
  );
};