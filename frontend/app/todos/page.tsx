"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

interface Todo {
  id: string; // Use 'string' or 'number' based on your API response
  name: string;
  description: string;
  status: 'in progress' | 'completed';
}

interface FetchTodosResponse {
  todos: Todo[];
  totalPages: number;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`; // Use environment variable

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // For success message

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    // Retrieve the token from localStorage or any other storage method you use
    const token = localStorage.getItem('token'); // Change this line as necessary

    try {
      const response = await axios.get<FetchTodosResponse>(`${API_URL}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the authorization header
        },
      });
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.error('Error fetching todos:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status:', error.response.status);
        setError(`Error ${error.response.status}: ${error.response.data.message || 'Failed to fetch todos.'}`);
      } else {
        setError('Failed to fetch todos. Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const refreshTodos = () => {
    fetchTodos();
    setSuccess('Todo added successfully!'); // Optionally set success message here
  };

  if (loading) return <p>Loading todos...</p>;

  return (
    <div>
      <h2>Your Todos</h2>
      {error && <p className="error-message" aria-live="assertive">{error}</p>}
      {success && <p className="success-message" aria-live="polite">{success}</p>}
      <TodoForm refreshTodos={refreshTodos} />
      {/* Pass refreshTodos prop to TodoList */}
      <TodoList todos={todos} refreshTodos={refreshTodos} />
      <div>
        <button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={page >= totalPages || loading}
          style={{ marginRight: '10px', cursor: page >= totalPages || loading ? 'not-allowed' : 'pointer' }}
        >
          Next Page
        </button>
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page <= 1 || loading}
          style={{ cursor: page <= 1 || loading ? 'not-allowed' : 'pointer' }}
        >
          Previous Page
        </button>
      </div>
    </div>
  );
};

export default Todos;
