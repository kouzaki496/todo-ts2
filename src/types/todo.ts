//src/types/todo.ts
export interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
  dueDate: string;
  details?: string;
  selected: boolean;
  userId?: string;
  createdAt?: Date;
}

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo?: (id: string | number) => Promise<void>;
  onEdit?: (todo: Todo) => void;
  onToggleSelect: (id: string | number) => void;
  isBulkDeleteMode: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => Promise<void>;
  onEdit?: (todo: Todo) => void;
  deleteTodo?: (id: string | number) => Promise<void>;
  onToggleSelect: (id: string | number) => void;
  isBulkDeleteMode: boolean;
}

export default Todo;