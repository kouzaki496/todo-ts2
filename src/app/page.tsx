// app/page.tsx
"use client";

import React, { useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { Header } from '@/components';
import { TodoList } from '@/components/Todo';
import TodoModal from '@/components/Todo/TodoModal/TodoModal';
import Todo from '@/types/todo';
import { FloatingActions } from '@/components/FloatingActions/FloatingActions';
import { useTodoRepository } from '@/hooks/useTodoRepository';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Sidebar } from '@/components/Navigation/Sidebar';

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
  const { todos, loading, addTodo, updateTodo, deleteTodo, isAuthenticated } = useTodoRepository();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleSaveTodo = async (title: string, dueDate: string, details: string, completed: boolean) => {
    try {
      if (selectedTodo) {
        await updateTodo({
          ...selectedTodo,
          title,
          dueDate,
          details,
          completed
        });
      } else {
        await addTodo({
          title,
          dueDate,
          details,
          completed,
          selected: false
        });
      }
      setIsModalOpen(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('タスクの保存に失敗しました。');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleToggleSelect = async (id: string | number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo({ ...todo, selected: !todo.selected });
    }
  };

  const handleBulkDelete = async () => {
    const selectedTodos = todos.filter(todo => todo.selected);
    if (selectedTodos.length === 0) {
      alert('削除するタスクが選択されていません。');
      return;
    }
    if (window.confirm(`${selectedTodos.length}件のタスクを削除しますか？`)) {
      await Promise.all(selectedTodos.map(todo => deleteTodo(todo.id)));
    }
  };

  const handleToggleBulkDeleteMode = () => {
    setIsBulkDeleteMode(!isBulkDeleteMode);
    if (isBulkDeleteMode) {
      todos.forEach(async (todo) => {
        await updateTodo({ ...todo, selected: false });
      });
    }
  };

  const handleSelectAll = async () => {
    await Promise.all(todos.map(todo => updateTodo({ ...todo, selected: true })));
  };

  const handleSelectCompleted = async () => {
    await Promise.all(todos.map(todo =>
      updateTodo({ ...todo, selected: todo.completed })
    ));
  };

  const handleClearSelection = async () => {
    await Promise.all(todos.map(todo =>
      updateTodo({ ...todo, selected: false })
    ));
  };

  const selectedCount = todos.filter(todo => todo.selected).length;

  return (
    <Container maxWidth="lg">
      <Header title="My Todo App" />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isDesktop && <Sidebar disabled={isBulkDeleteMode} />}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Todo List
            </Typography>
            <TodoList
              todos={todos}
              updateTodo={updateTodo}
              onEdit={isBulkDeleteMode ? undefined : handleEditTodo}
              deleteTodo={isBulkDeleteMode ? undefined : deleteTodo}
              onToggleSelect={handleToggleSelect}
              isBulkDeleteMode={isBulkDeleteMode}
            />
            <FloatingActions
              onAddClick={() => setIsModalOpen(true)}
              onBulkDeleteClick={handleToggleBulkDeleteMode}
              onSelectAll={handleSelectAll}
              onSelectCompleted={handleSelectCompleted}
              onClearSelection={handleClearSelection}
              onBulkDelete={handleBulkDelete}
              disabled={isBulkDeleteMode}
              isBulkDeleteMode={isBulkDeleteMode}
              selectedCount={selectedCount}
            />
            <TodoModal
              open={isModalOpen && !isBulkDeleteMode}
              todo={selectedTodo}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedTodo(null);
              }}
              onSave={handleSaveTodo}
              onDelete={deleteTodo}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Page;