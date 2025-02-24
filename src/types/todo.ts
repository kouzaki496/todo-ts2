//src/types/todo.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  details?: string;
}

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default Todo;