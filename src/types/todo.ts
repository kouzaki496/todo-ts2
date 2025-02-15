//src/types/todo.ts
interface Todo {
  id:number;
  title:string;
  completed:boolean;
  dueDate:string;
}

export interface TodoItemProps {
  todo:Todo;
  updateTodo: (id: number, updatedTask: Partial<Todo>) => void;
  deleteTodo: (id:number) => void;
}

export default Todo;