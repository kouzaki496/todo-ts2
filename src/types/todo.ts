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
  updateTodo: (id: number, updatedTask: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

export default Todo;