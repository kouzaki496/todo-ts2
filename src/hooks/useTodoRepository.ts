//src/hooks/useTodoRepository.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { TodoRepository } from '../repositories/TodoRepository';
import Todo from '../types/todo';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Todoリストの状態管理とデータベース操作を行うカスタムフック
 */
export const useTodoRepository = () => {
  // State管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    //アンマウント時に監視解除
    return () => unsubscribe();
  }, []);

  /**
   * Todoリストをデータベースから取得
   * @param uid
   */
  const fetchTodos = async (uid: string | null) => {
    if (!uid) return;

    setLoading(true);
    setError(null);
    try {
      const loadedTodos = await TodoRepository.getTodos(uid);
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // ユーザーIDが変更されたらTodoリストを再取得
  useEffect(() => {
    fetchTodos(userId);
  }, [userId]);

  /**
   * TodoオブジェクトをFirestore用のデータに変換
   * @param todo
   */
  const convertTodoToData = (todo: Todo) => ({
    title: todo.title,
    completed: todo.completed,
    dueDate: todo.dueDate,
    details: todo.details,
    selected: todo.selected,
  });

  /**
   * 追加
   * @param todo
   */
  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    try {
      const newTodo = await TodoRepository.addTodo(todo, userId);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  /**
   * 更新
   * @param updatedTodo
   */
  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const todoRef = doc(db, 'todos', updatedTodo.id.toString());
      const docSnap = await getDoc(todoRef);
      const todoData = convertTodoToData(updatedTodo);

      if (!docSnap.exists()) {
        await setDoc(todoRef, todoData);
      } else {
        await updateDoc(todoRef, todoData);
      }

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      setError(error instanceof Error ? error : new Error('Update failed'));
      throw error;
    }
  };

  /**
   * 削除
   * @param todoId
   */
  const deleteTodo = async (todoId: number | string) => {
    try {
      await TodoRepository.deleteTodo(todoId, userId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    isAuthenticated: !!userId,
    refresh: () => fetchTodos(userId),
  };
};