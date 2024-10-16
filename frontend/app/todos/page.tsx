"use client";  // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { fetchTodos } from '../../services/api';  // Import the API service

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');  // Track selected status

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const response = await fetchTodos(page, limit, status);  // Pass status to the API
        setTodos(response.data);
      } catch (error) {
        setError('Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [page, status]);  // Fetch todos on page change or status change

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Your Todos</h1>
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">Filter by Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>{todo.name} - {todo.status}</a>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TodosPage;
