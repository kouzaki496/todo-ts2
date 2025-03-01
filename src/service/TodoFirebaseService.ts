import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import Todo from '../types/todo';

/**
 * Firebaseとの通信を担当するサービス
 *
 * 役割:
 * - Firestoreデータベースとの通信処理
 * - CRUDオペレーションの実装
 * - データの永続化
 * - 認証状態に応じたデータアクセス制御
 */
export class TodoFirebaseService {
  private static STORAGE_KEY = 'todos';

  // ローカルストレージからデータを取得
  private static getLocalTodos(): Todo[] {
    const todosJson = localStorage.getItem(this.STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  // ローカルストレージにデータを保存
  private static setLocalTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  // Firestoreからユーザーのtodosを取得
  private static async getFirestoreTodos(userId: string): Promise<Todo[]> {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    } as Todo));
  }

  // データの取得
  static async getTodos(userId: string | null): Promise<Todo[]> {
    if (userId) {
      return this.getFirestoreTodos(userId);
    }
    return this.getLocalTodos();
  }

  // データの追加
  static async addTodo(todo: Omit<Todo, 'id'>, userId: string | null): Promise<Todo> {
    if (userId) {
      const docRef = await addDoc(collection(db, 'todos'), {
        ...todo,
        userId,
        createdAt: new Date(),
      });
      return { ...todo, id: docRef.id } as Todo;
    } else {
      const todos = this.getLocalTodos();
      const newTodo = {
        ...todo,
        id: Math.max(...todos.map(t => Number(t.id)), 0) + 1,
      } as Todo;
      todos.push(newTodo);
      this.setLocalTodos(todos);
      return newTodo;
    }
  }

  // データの更新
  static async updateTodo(todo: Todo, userId: string | null): Promise<void> {
    if (userId) {
      const todoRef = doc(db, 'todos', String(todo.id));
      await updateDoc(todoRef, { ...todo });
    } else {
      const todos = this.getLocalTodos();
      const index = todos.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        todos[index] = todo;
        this.setLocalTodos(todos);
      }
    }
  }

  // データの削除
  static async deleteTodo(todoId: number | string, userId: string | null): Promise<void> {
    if (userId) {
      await deleteDoc(doc(db, 'todos', String(todoId)));
    } else {
      const todos = this.getLocalTodos();
      this.setLocalTodos(todos.filter(t => t.id !== todoId));
    }
  }
}