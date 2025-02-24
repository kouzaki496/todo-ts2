import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { TodoRepository } from '../repositories/TodoRepository';
import Todo from '../types/todo';

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

  const updateTodo = async (todo: Todo) => {
    try {
      await TodoRepository.updateTodo(todo, userId);
      setTodos(prev => prev.map(t => t.id === todo.id ? todo : t));
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