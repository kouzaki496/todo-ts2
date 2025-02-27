//src/components/Todo/List/TodoList.tsx
import { Stack } from "@mui/material";
import TodoItem from "@/components/Todo/Item/TodoItem";
import { TodoListProps } from "@/types/todo";
import { compareDates } from '@/utils/date';

/**
 * Todoリストを表示するコンポーネント
 * - リストの表示制御
 * - リストのレイアウト
 */
export const TodoList = ({
  todos,
  updateTodo,
  onEdit,
  onToggleSelect,
  isBulkDeleteMode
}: TodoListProps) => {
  return (
    <Stack spacing={2}>
      {todos.map(todo => {
        const { isOverdue, isDueToday } = compareDates(todo.dueDate);

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

export default TodoList;
