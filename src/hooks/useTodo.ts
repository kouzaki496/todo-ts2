//src/hooks/useTodo.ts
import { useState } from 'react';

interface Todo {
  id:number;
  title:string;
  completed:boolean;
  dueDate:string;
}

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //Todoを追加する
  const addTodo = (title:string, dueDate:string) => {
    const newTodo:Todo = {
      id:Date.now(),
      title,
      completed:false,
      dueDate,
    }
    setTodos([...todos, newTodo]);
  };

  //Todoを削除する
  const deleteTodo = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //Todoを更新する
  const updateTodo = (id:number, completed:boolean) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, completed} : todo));
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo
  };
};

export default useTodo;




