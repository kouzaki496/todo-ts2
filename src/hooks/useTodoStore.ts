//src/hooks/useTodoRepository.ts
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { TodoFirebaseService } from '../service/TodoFirebaseService';
import Todo from '../types/todo';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Todoリストの状態管理とデータベース操作を行うカスタムフック
 * - 認証済み：Firestore でデータを管理
 * - 未認証：LocalStorage でデータを管理
 */
export const useTodoRepository = () => {
  // State管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  /**
   * LocalStorage関連の操作をまとめたオブジェクト
   */
  const localStorage = {
    /**
     * LocalStorageからTodoリストを取得
     */
    getTodos: () => {
      const data = window.localStorage.getItem('todos');
      return data ? JSON.parse(data) : [];
    },

    /**
     * LocalStorageにTodoリストを保存
     */
    saveTodos: (todos: Todo[]) => {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    },

    /**
     * 新しいTodoを追加
     */
    addTodo: (todo: Omit<Todo, 'id'>) => {
      const newTodo = {
        ...todo,
        id: `local_${Date.now()}`,
      };
      const currentTodos = localStorage.getTodos();
      const newTodos = [...currentTodos, newTodo];
      localStorage.saveTodos(newTodos);
      setTodos(newTodos);
      return newTodo;
    },

    updateTodo: (updatedTodo: Todo) => {
      const currentTodos = localStorage.getTodos();
      const newTodos = currentTodos.map((todo: Todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      localStorage.saveTodos(newTodos);
      setTodos(newTodos);
    },

    deleteTodo: (todoId: string | number) => {
      const currentTodos = localStorage.getTodos();
      const newTodos = currentTodos.filter((todo: Todo) => todo.id !== todoId);
      localStorage.saveTodos(newTodos);
      setTodos(newTodos);
    }
  };

  // 認証状態の監視と初期データの読み込み
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
      if (!user) {
        setTodos(localStorage.getTodos());
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // データの取得
  const fetchTodos = async (uid: string | null) => {
    if (!uid) {
      setTodos(localStorage.getTodos());
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const loadedTodos = await TodoFirebaseService.getTodos(uid);
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // ユーザーID変更時のデータ再取得
  useEffect(() => {
    fetchTodos(userId);
  }, [userId]);

  // Todo操作のメソッド
  const addTodo = useCallback(async (todo: Omit<Todo, 'id'>) => {
    if (isAdding) return;
    setIsAdding(true);

    try {
      if (!userId) {
        return localStorage.addTodo(todo);
      }
      const newTodo = await TodoFirebaseService.addTodo(todo, userId);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  }, [isAdding, userId, todos]);

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
   * 更新
   * @param updatedTodo
   */
  const updateTodo = async (updatedTodo: Todo) => {
    try {
      if (!userId) {
        localStorage.updateTodo(updatedTodo);
        return;
      }
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
      throw error;
    }
  };

  /**
   * 削除
   * @param todoId
   */
  const deleteTodo = async (todoId: number | string) => {
    try {
      if (!userId) {
        localStorage.deleteTodo(todoId);
        return;
      }
      await TodoFirebaseService.deleteTodo(todoId, userId);
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
    refresh: () => fetchTodos(userId),
  };
};