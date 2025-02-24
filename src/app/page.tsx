// app/page.tsx
"use client";

import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTodo } from '../hooks/useTodo';
import TodoList from '../components/TodoList/TodoList';
import Header from '../components/Header/Header';
import AddTodoButton from '../components/AddTodoButton/AddTodoButton';
import TodoModal from '../components/Modals/TodoModal';
import Todo from '../types/todo';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Sample Task 1',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明日の日付
    details: 'This is a sample task detail.',
    selected: false,
  },
  {
    id: 2,
    title: 'Sample Task 2',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // 今日の日付
    details: 'This task is completed.',
    selected: false,
  },
  {
    id: 3,
    title: 'Sample Task 3',
    completed: false,
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 昨日の日付
    details: 'This task is overdue.',
    selected: false,
  },
];

const Page: React.FC = () => {
  const { addTodo } = useTodo();
  const [localTodos, setLocalTodos] = useState<Todo[]>(initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);

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
      selected: false,
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

  const handleBulkDelete = () => {
    const selectedTodos = localTodos.filter(todo => todo.selected);
    if (selectedTodos.length === 0) {
      alert('削除するタスクが選択されていません。');
      return;
    }
    if (window.confirm(`${selectedTodos.length}件のタスクを削除しますか？`)) {
      setLocalTodos(prevTodos => prevTodos.filter(todo => !todo.selected));
    }
  };

  const handleToggleSelect = (id: number) => {
    setLocalTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handleToggleBulkDeleteMode = () => {
    setIsBulkDeleteMode(!isBulkDeleteMode);
    if (isBulkDeleteMode) {
      setLocalTodos(prevTodos =>
        prevTodos.map(todo => ({ ...todo, selected: false }))
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <Header title="My Todo App" />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant={isBulkDeleteMode ? "contained" : "outlined"}
            color={isBulkDeleteMode ? "error" : "primary"}
            onClick={handleToggleBulkDeleteMode}
            startIcon={<DeleteSweepIcon />}
          >
            {isBulkDeleteMode ? '一括削除モードを終了' : '一括削除モードを開始'}
          </Button>
          {isBulkDeleteMode && (
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
            >
              選択したタスクを削除
            </Button>
          )}
        </Box>
        <TodoList
          todos={localTodos}
          updateTodo={handleUpdateTodo}
          onEdit={handleEditTodo}
          deleteTodo={handleDeleteTodo}
          onToggleSelect={handleToggleSelect}
          isBulkDeleteMode={isBulkDeleteMode}
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