//src/hooks/useTodo.ts
import { useState } from 'react';
import Todo from '../types/todo';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //Todoを追加する
  const addTodo = (title:string, dueDate:string) => {
    const newTodo:Todo = {
      id:Date.now(),
      title,
      completed:false,
      dueDate,
      selected: false,
    }
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  //Todoを削除する
  const deleteTodo = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //Todoを更新する
  const updateTodo = (id:number, updatedFields:Partial<Todo>) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo)));
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo
  };
};

export default useTodo;




