//src/types/todo.ts
/**
 * TodoのID型
 * - Firestore: 文字列のドキュメントID
 * - クライアント: 数値のID（例：Date.now()）
 */
export type TodoId = string | number;

/**
 * Todoの基本データ型
 * 新規作成時に使用する最小限の型
 */
export interface TodoBase {
  title: string;
  completed: boolean;
  dueDate: string;
  details?: string;
  selected: boolean;
}

/**
 * 完全なTodoの型
 * データベースに保存される際の型
 */
export interface Todo extends TodoBase {
  id: TodoId;
  userId?: string;
  createdAt?: Date;
}

/**
 * Todoリストアイテムのプロップス型
 */
export interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo?: (id: TodoId) => Promise<void>;
  onEdit?: (todo: Todo) => void;
  onToggleSelect: (id: TodoId) => void;
  isBulkDeleteMode: boolean;
}

/**
 * Todoリストのプロップス型
 */
export interface TodoListProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => Promise<void>;
  onEdit?: (todo: Todo) => void;
  deleteTodo?: (id: TodoId) => Promise<void>;
  onToggleSelect: (id: TodoId) => void;
  isBulkDeleteMode: boolean;
}

export interface TodoCardProps {
  todo: Todo;
  onSelect: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete: (completed: boolean) => void;
  isBulkDeleteMode: boolean;
}

export default Todo;