//src/types/todo.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  details?: string;
  selected: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onToggleSelect: (id: number) => void;
  isBulkDeleteMode: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  onEdit: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  onToggleSelect: (id: number) => void;
  isBulkDeleteMode: boolean;
}

export default Todo;