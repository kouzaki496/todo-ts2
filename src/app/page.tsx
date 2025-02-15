// app/page.tsx
"use client";

import React from 'react';
import { Typography } from '@mui/material';
import Button from '@/components/Button/Button'
import { useTodo } from '../hooks/useTodo';
import TodoItem from '../components/TodoItem/TodoItem';

export default function Home() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodo();

  // 初期データを追加する例
  React.useEffect(() => {
    addTodo('Learn React', '2023-12-31');
    addTodo('Build a Todo App', '2023-12-31');
  }, []);

  return (
    <div>
      <Typography variant="h1" color="primary">Hello, MUI!</Typography>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
      <div>
        <Typography variant="h1" color="primary.dark">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
        <Typography variant="subtitle1">Subtitle 1</Typography>
        <Typography variant="subtitle2">Subtitle 2</Typography>
        <Typography variant="body1">Body 1 text</Typography>
        <Typography variant="body2">Body 2 text</Typography>
        <Typography variant="caption">Caption text</Typography>
        <Typography variant="button">Button text</Typography>
      </div>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}