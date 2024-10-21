// /frontend/app/todos/page.tsx

"use client"; // Add this line to mark the component as a Client Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_URL = 'http://localhost:3001/api/todos'; // Adjust your API endpoint

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // Function to fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]); // Reset todos on error
      setTotalPages(0); // Reset total pages on error
    }
  };

  // useEffect to fetch todos on page change
  useEffect(() => {
    fetchTodos();
  }, [page]); // Fetch todos when the page changes

  // Function to refresh the todos
  const refreshTodos = () => {
    fetchTodos(); // Re-fetch todos
  };

  return (
    <div>
      <h2>Your Todos</h2>
      <TodoForm refreshTodos={refreshTodos} />
      <TodoList todos={todos} />
      <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page >= totalPages}>
        Next Page
      </button>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1}>
        Previous Page
      </button>
    </div>
  );
};

export default Todos;
