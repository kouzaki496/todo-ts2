import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { TodoRepository } from '../repositories/TodoRepository';
import Todo from '../types/todo';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const useTodoRepository = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const loadedTodos = await TodoRepository.getTodos(userId);
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [userId]);

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

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const todoRef = doc(db, 'todos', updatedTodo.id.toString());

      // ドキュメントが存在するか確認
      const docSnap = await getDoc(todoRef);

      // Todoオブジェクトをプレーンなデータに変換
      const todoData = {
        title: updatedTodo.title,
        completed: updatedTodo.completed,
        dueDate: updatedTodo.dueDate,
        details: updatedTodo.details,
        selected: updatedTodo.selected,
      };

      if (!docSnap.exists()) {
        await setDoc(todoRef, todoData);
      } else {
        await updateDoc(todoRef, todoData);
      }

      // ローカルのステートを更新
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
    addTodo,
    updateTodo,
    deleteTodo,
    isAuthenticated: !!userId,
  };
};