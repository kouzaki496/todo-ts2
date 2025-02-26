// //src/hooks/useTodo.ts
// ローカルの状態管理のみ
// データベースとの同期は行わない
// テスト用として残す？

// import { useState } from 'react';
// import Todo from '../types/todo';

// export const useTodo = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   //追加処理
//   const addTodo = (title:string, dueDate:string) => {
//     const newTodo:Todo = {
//       id:Date.now(),
//       title,
//       completed:false,
//       dueDate,
//       selected: false,
//     }
//     setTodos(prevTodos => [...prevTodos, newTodo]);
//   };

//   //削除処理
//   const deleteTodo = (id:number) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   //更新処理
//   const updateTodo = (id:number, updatedFields:Partial<Todo>) => {
//     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo)));
//   };

//   return {
//     todos,
//     addTodo,
//     deleteTodo,
//     updateTodo
//   };
// };

// export default useTodo;




