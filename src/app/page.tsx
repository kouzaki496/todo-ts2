// app/page.tsx
"use client";

import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTodo } from '../hooks/useTodo';
import TodoList from '../components/TodoList/TodoList';
import Header from '../components/Header/Header';
import AddTodoButton from '../components/AddTodoButton/AddTodoButton';
import TodoModal from '../components/Modals/TodoModal';
import Todo from '../types/todo';

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Sample Task 1',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明日の日付
    details: 'This is a sample task detail.',
  },
  {
    id: 2,
    title: 'Sample Task 2',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // 今日の日付
    details: 'This task is completed.',
  },
  {
    id: 3,
    title: 'Sample Task 3',
    completed: false,
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
    details: 'This task is overdue.',
  },
];

const Page: React.FC = () => {
  const { addTodo } = useTodo();
  const [localTodos, setLocalTodos] = useState<Todo[]>(initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleUpdateTodo = (id: number, updatedFields: Partial<Todo>) => {
    setLocalTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setLocalTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (title: string, dueDate: string, details: string, completed: boolean) => {
    const newTodo: Todo = {
      id: Math.max(...localTodos.map(todo => todo.id), 0) + 1,
      title,
      completed,
      dueDate,
      details,
    };
    setLocalTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleSaveTodo = (title: string, dueDate: string, details: string, completed: boolean) => {
    if (selectedTodo) {
      handleUpdateTodo(selectedTodo.id, { title, dueDate, details, completed });
    } else {
      handleAddTodo(title, dueDate, details, completed);
    }
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Header title="My Todo App" />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <TodoList
          todos={localTodos}
          updateTodo={handleUpdateTodo}
          onEdit={handleEditTodo}
          deleteTodo={handleDeleteTodo}
        />
        <AddTodoButton onClick={() => setIsModalOpen(true)} />
        <TodoModal
          open={isModalOpen}
          todo={selectedTodo}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTodo(null);
          }}
          onSave={handleSaveTodo}
          onDelete={handleDeleteTodo}
        />
      </Box>
    </Container>
  );
};

export default Page;