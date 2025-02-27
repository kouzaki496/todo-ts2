import { Todo } from '../types/todo';

// サンプルTodo作成用のヘルパーのみを残す
export const createSampleTodo = (id: number, title: string, dueDate: string): Todo => ({
  id,
  title,
  completed: false,
  dueDate,
  selected: false,
});