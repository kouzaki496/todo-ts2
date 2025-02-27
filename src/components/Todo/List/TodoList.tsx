//src/components/Todo/List/TodoList.tsx
import { Stack } from "@mui/material";
import TodoItem from "../Item/TodoItem";
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
      {todos.map(todo => {
        // 日付関連のロジックをインライン化
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = new Date(todo.dueDate) < new Date(today);
        const isDueToday = todo.dueDate === today;

        return (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            selected={todo.selected}
            dueDate={todo.dueDate}
            isOverdue={isOverdue}
            isDueToday={isDueToday}
            isBulkDeleteMode={isBulkDeleteMode}
            onSelect={() => onToggleSelect(todo.id)}
            onComplete={(checked) => updateTodo({ ...todo, completed: checked })}
            onEdit={onEdit ? () => onEdit(todo) : undefined}
          />
        );
      })}
    </Stack>
  );
};