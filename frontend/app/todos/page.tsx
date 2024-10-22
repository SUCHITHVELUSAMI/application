"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_URL = 'http://localhost:3001/api/todos'; // Ensure this matches your controller

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.error('Error fetching todos:', error.response ? error.response.data : error.message);
      setTodos([]);
      setTotalPages(0);
      setError('Failed to fetch todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const refreshTodos = () => {
    fetchTodos();
  };

  if (loading) return <p>Loading todos...</p>;

  return (
    <div>
      <h2>Your Todos</h2>
      {error && <p className="error-message">{error}</p>}
      <TodoForm refreshTodos={refreshTodos} />
      <TodoList todos={todos} />
      <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page >= totalPages || loading}>
        Next Page
      </button>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1 || loading}>
        Previous Page
      </button>
    </div>
  );
};

export default Todos;
