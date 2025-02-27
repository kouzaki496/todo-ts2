//src/hooks/useTodoRepository.ts
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { TodoRepository } from '../repositories/TodoRepository';
import Todo from '../types/todo';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Todoリストの状態管理とデータベース操作を行うカスタムフック
 */
export const useTodoRepository = () => {
  // State管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);  // 認証チェック完了フラグを追加
  const [error, setError] = useState<Error | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // ローカルストレージからTodoを取得
  const getLocalTodos = () => {
    const localTodos = localStorage.getItem('todos');
    return localTodos ? JSON.parse(localTodos) : [];
  };

  // ローカルストレージにTodoを保存
  const saveLocalTodos = (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
      setAuthChecked(true);
      if (!user) {
        // 未認証時はローカルストレージから読み込み
        setTodos(getLocalTodos());
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  /**
   * Todoリストをデータベースから取得
   * @param uid
   */
  const fetchTodos = async (uid: string | null) => {
    if (!uid) {
      // 未認証時はローカルストレージから読み込み
      setTodos(getLocalTodos());
      setLoading(false);
      return;
    }

    // 認証時はFirestoreから読み込み
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

  // 未認証時のTodo操作
  const addLocalTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveLocalTodos(newTodos);
    return newTodo;
  };

  // Todoの追加
  const addTodo = useCallback(async (todo: Omit<Todo, 'id'>) => {
    if (isAdding) return;
    setIsAdding(true);

    try {
      if (!userId) {
        // 未認証時はローカルストレージに保存
        return addLocalTodo(todo);
      }
      // 認証時はFirestoreに保存
      const newTodo = await TodoRepository.addTodo(todo, userId);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  }, [isAdding, userId, todos]);

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
    isAdding,
    updateTodo,
    deleteTodo,
    isAuthenticated: !!userId,
    authChecked,  // 認証チェック完了状態を公開
    refresh: () => fetchTodos(userId),
  };
};